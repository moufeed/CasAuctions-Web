using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks; 
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc; 
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;   
using TamTech.CasAuctions.Web.Services.Identity; 
using Microsoft.AspNetCore.Mvc.Rendering;
using TamTech.CasAuctions.Web.Core.Constants;
using Microsoft.Extensions.Localization;
using TamTech.CasAuctions.Web.Core.Models.IdentityModels;
using TamTech.CasAuctions.Web.Services.Telemetry;
using TamTech.CasAuctions.Web.Core.ViewModels.Admin.User;
using TamTech.CasAuctions.Web.Core.Mappers.IdentityMapper;
using TamTech.CasAuctions.Web.App.Controllers.Admin;
using TamTech.CasAuctions.Web.Core.Models.CommonModels.Filters;
using TamTech.CasAuctions.Web.Core.Models.CommonModels.Pagination;

namespace TamTech.CasAuctions.Web.Core.Controllers.Admin
{
    [Authorize()]
     
    public  class UsersController : AdminBaseController
    {
        #region Props 
        IUsersManagerService _IdentityService; 
        IRolesService _rolesService;
        private readonly IStringLocalizer<AdminBaseController> _localizer;
        #endregion

        #region Ctors
        public UsersController(ITelemetryClientService telemetryClientService,
                               IUsersManagerService identityService,
                                IRolesService rolesService, 
                                IStringLocalizer<AdminBaseController> localizer)
            : base(telemetryClientService, localizer)
        {

            this._IdentityService = identityService; 
            this._rolesService = rolesService;
            _localizer = localizer;
        }
        #endregion


        #region utility
         private async Task GetRolesList()
        {
            var roles = await _rolesService.GetAllAsync();
            List<RoleModel> userRoles = new List<RoleModel>();
             
            foreach (var role in roles) {
                userRoles.Add(new RoleModel
                {
                    Id = role.Id,
                    Name = _localizer[role.Name]
                });
            }

            ViewBag.Roles = new SelectList(userRoles, "Id", "Name");

        }


        #endregion

        #region Actions
        [HttpGet("Logout")]
        public IActionResult Logout()
        {
            return SignOut("Cookies", "oidc");
        }

        [Authorize(Policy = ContentSDKPoliciesConstants.SuperAdmin)]
        [HttpGet("{Culture}/[Area]/[Controller]/Auth")]
        public virtual async Task<IActionResult> Auth(Filters model)
        {
            ViewBag.Authorize = "Authorized";
            return View("Index", new List<UserModel>());

        }

        [HttpGet("{Culture}/[Area]/[Controller]")]
        public virtual async Task<IActionResult> Index(Filters model)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            try
            {
               // await GetRolesList();
                var models = new GetUsersModel()
                {
                    PageNumber = model.PageNumber,
                    UserName = string.IsNullOrEmpty(model.Name) ? "" : model.Name,
                    PageSize = model.PageSize,
                    RoleId = model.RoleId,
                };
                var result = await _IdentityService.GetUsersAsync(models);

                if (result.Success)
                {
                    ViewBag.pagination = (PaginationMetadataModel)result.Header;
                    return View(result.Data);
                }
            }
            catch (Exception ex)
            {
                TrackException(ex);
            }


            return View(new List<UserModel>());
        }


        //[HttpGet("{Culture}/[Area]/[Controller]")]
        //public virtual async Task<IActionResult> Index(Filter model)
        //{
        //    ViewBag.showReset = new Filter().Equals(model);

        //    GetDefaultFiltersList(model);

        //    ViewBag.FilterModel = model;
        //    try
        //    { 
        //        await GetRolesList();
        //var models = new GetUsersModel()
        //{
        //    PageNumber = model.PageNumber,
        //    UserName = string.IsNullOrEmpty(model.Name) ? "" : model.Name,
        //    PageSize = model.PageSize,
        //    RoleId = model.RoleId,
        //};

        //        var result = await _IdentityService.GetUsersAsync(models);

        //        if (result.Success)
        //        {
        //            ViewBag.pagination = (PaginationMetadataModel)result.Header;
        //            return View(result.Data);
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        TrackException(ex);
        //    }

        //    return View(new List<UserModel>());
        //}




        // GET: Users/Create
        [HttpGet("{Culture}/[Area]/[Controller]/create")]
        public virtual async Task<IActionResult> Create()
        {
            try
            {
              //  ViewBag.Message = "TempData :" + (TempData["Message"] as string);// "Your application description page.";
                await GetRolesList();
            }
            catch (Exception ex)
            {
                TrackException(ex);
            }

            return View();
        }

        // POST: Users/Create
       
        [HttpPost("{Culture}/[Area]/[Controller]/create")]
        public virtual async Task<IActionResult> Create(CreateUserDto createDto)
        {
            try
            {
                await GetRolesList();
                if (ModelState.IsValid)
                {
                    var roles = ViewBag.Roles as IEnumerable<RoleModel>; 
                    foreach (var role in createDto.Roles)
                    {
                       if(roles.FirstOrDefault(r => r.Name == role) == null)
                        {
                            AddErrorModel(_localizer["c_rols"], _localizer["c_roles_required"]);
                            return View(User);
                        }
                    }
                   
                    var user =  createDto.MapCreateDtoToRegisterModel();
                    var result = await _IdentityService.RegisterUserAsync(user);
                    HandelPostingResult(result, _localizer["c_user_creation_successfully"] );
                    if (result.Success)
                    {
                        
                        return RedirectToAction("Index");
                    }
                }
               
            }
            catch (Exception ex)
            {
                TrackException(ex);
            }


            return View(createDto.MapCreateDtoToCreateVM());
        }

        [HttpGet("{Culture}/[Area]/[Controller]/Account/{username}")]
        public virtual async Task<IActionResult> Details(string username)
        {
            try
            {
                var result = await _IdentityService.GetUserByUsernameAsync(username);
                if (result.Success)
                {
                //   ViewBag.BlockEndpointUrl = $"{GetCurrentDataLang()}/admin/Users/Block/{username}";// _IdentityBackendSettings.BlockUserAsyncEndpoint;
                //  ViewBag.UnlockEndpointUrl = $"{GetCurrentDataLang()}/admin/Users/unblock/{username}";// _IdentityBackendSettings.UnblockUserAsyncEndpoint;
                    return View(result.Data);
                }
            }
            catch (Exception ex)
            {
                TrackException(ex);
            }

            return View();

        }


        [HttpPost("{Culture}/[Area]/[Controller]/Account/block/{username}")]
        public virtual async Task<JsonResult> Block(UserNameModel model)
        {
             
            try
            {
                if (ModelState.IsValid)
                {
                    var result = (await _IdentityService.BlockUserAsync(model));
                    return Json(result);
                }
                else
                {
                    var errors = new Dictionary<string, string>();
                    int index = 0;
                    foreach (var state in ModelState.Values)
                    {
                        foreach (var error in state.Errors)
                        {
                            errors.Add($"error{index}", error.ErrorMessage);
                            index++;
                        }
                    }
                    return Json(new
                    {
                        Success = false,
                        Messages = errors
                    });
                }
            }
            catch (Exception ex)
            {
                TrackException(ex);
                return Json(new
                {
                    Success = false,
                    Messages = new Dictionary<string, string> {
                                           {  _localizer["error"], _localizer["something_wrong"] }
                                        }
                });
            }

             
        }

        [HttpPost("{Culture}/[Area]/[Controller]/Account/unblock/{username}")]
        public virtual async Task<JsonResult> Unblock(UserNameModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = (await _IdentityService.UnblockUserAsync(model));
                    return Json(result);
                }
                else
                {
                    var errors = new Dictionary<string, string>();
                    int index = 0;
                    foreach (var state in ModelState.Values)
                    {
                        foreach (var error in state.Errors)
                        {
                            errors.Add($"error{index}", error.ErrorMessage);
                            index++;
                        }
                    }
                    return Json(new
                    {
                        Success = false,
                        Messages = errors
                    });
                }
            }
            catch (Exception ex)
            {
                TrackException(ex);
                return Json(new
                {
                    Success = false,
                    Messages = new Dictionary<string, string> {
                                            { _localizer["error"] , _localizer["something_wrong"]   }
                                        }
                });
            } 
        }

       



        #region Actions Not Using
        [HttpGet("{Culture}/[Area]/[Controller]/Edit/{username}")]
        public virtual async Task<IActionResult> Edit(string username)

        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            var result = await _IdentityService.GetUserByUsernameAsync(username);
            if (result.Success)
            {
                //ViewBag.BlockEndpointUrl = _IdentityBackendSettings.BlockUserAsyncEndpoint;
                //ViewBag.UnlockEndpointUrl = _IdentityBackendSettings.UnblockUserAsyncEndpoint;
                return View(result.Data);

            }
            return View();


        }
        // GET: Users/Edit/5
        public virtual ActionResult Edit(int id)

        {
            return View();
        }

        // POST: Users/Edit/5
        [HttpPost("{Culture}/[Area]/[Controller]/Edit/{id}")]
        public virtual ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
        /*
        // GET: Users/Delete/5
        [HttpGet("Users/Delete/{username}")]
        public virtual async Task<JsonResult> Delete(string username)
        {
            var accessToken = await HttpContext.GetTokenAsync("access_token");
            try
            {
                if (!string.IsNullOrEmpty(username))
                {
                    var result = await _IdentityService.DeleteUserByUsernameAsync(username);

                    return Json(result);
                }

            }
            catch (Exception)
            {
                return Json(new
                {
                    Success = false,
                    Messages = new Dictionary<string, string> {
                                            { "Error", "Something wrong" }
                                        }
                });
            }

            return Json(new
            {
                Success = false,
                Messages = new Dictionary<string, string> {
                                            { "Error", "Something wrong" }
                                        }
            });
        }

        // POST: Users/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public virtual ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

    */
        #endregion
        #endregion


    }
}