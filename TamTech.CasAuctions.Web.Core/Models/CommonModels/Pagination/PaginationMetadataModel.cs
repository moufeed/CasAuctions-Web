using System;
using System.Collections.Generic;
using System.Text;

namespace TamTech.CasAuctions.Web.Core.Models.CommonModels.Pagination
{
    public class PaginationMetadataModel
    {
        public int TotalCount { get; set; }

        public int PageSize { get; set; }

        public string PageNumber { get; set; }

        public int TotalPages { get; set; }

        public bool PreviousPage { get; set; } = false;

        public bool NextPage { get; set; } = false;

         
    }
}
/*
 


Steps of Reference token:
Actors: 
1 – Identity server. 
2 – API.		 (identity.api)
3 – Client.	(AdminPanel)

API:
In AddIdentityServerAuthentication method Add ApiSecret = "apisecret" option 

Client:
Set AccessTokenType = AccessTokenType.Reference via database.
Go to Clients table in identity server DB and set AccessTokenType  field (1) value.


Identity server: 
Go to ApiSecret table in identity server database and add new record 
{ApiResourceId = API Id (identity.api id), Type = "SharedSecret", Value = "apisecret".Sha256())}




 * */


/*
         [HttpPost("{userid}")]
        [Authorize(Policy = PolicyConstants.UsersManager, AuthenticationSchemes = IdentityServerAuthenticationDefaults.AuthenticationScheme)]
        public async Task<IActionResult> BlockAsync(string userId)
        {
            return await LockUserAccount(userId);
        }


   public async Task<IActionResult> LockUserAccount(string userId, int? forDays = null)
    {
        using (var scope = await _context.Database.BeginTransactionAsync(System.Data.IsolationLevel.ReadUncommitted))
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                ModelState.AddModelError("User Info", "User does not exist!");
                return BadRequest(ModelState);
            }
            var result = await _userManager.SetLockoutEnabledAsync(user, true);
            if (result.Succeeded)
            {
                if (forDays.HasValue)
                {
                    result = await _userManager.SetLockoutEndDateAsync(user, DateTimeOffset.UtcNow.AddDays(forDays.Value));
                }
                else
                {
                    result = await _userManager.SetLockoutEndDateAsync(user, DateTimeOffset.MaxValue);
                }
                if (result.Succeeded)
                {
                    scope.Commit();
                    return Ok();
                }
                else
                {
                    scope.Rollback();
                    return StatusCode(500, result.Errors);
                }
            }
            else
            {
                scope.Rollback();
                return StatusCode(500, result.Errors);
            }

        }

    }
    public async Task<IActionResult> UnlockUserAccount(string userId)
    {
        using (var scope = await _context.Database.BeginTransactionAsync(System.Data.IsolationLevel.ReadUncommitted))
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                ModelState.AddModelError("User Info", "User does not exist!");
                return BadRequest(ModelState);
            }

            var result = await _userManager.SetLockoutEnabledAsync(user, false);
            if (result.Succeeded)
            {
                result = await _userManager.SetLockoutEndDateAsync(user, null);

                if (result.Succeeded)
                {
                    await _userManager.ResetAccessFailedCountAsync(user);
                    return Ok();
                }
                else
                {
                    scope.Rollback();
                    return StatusCode(500, result.Errors);
                }
            }
            else
            {
                scope.Rollback();
                return StatusCode(500, result.Errors);
            }
        } 
    } 













       
    public class ValidateUserFilter : IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext context)
        {
            var user = context.HttpContext.User.;
            if ( !(!user.LockoutEnabled ||
                   !user.LockoutEnd.HasValue ||
                   user.LockoutEnd <= DateTime.Now))
            {
                // revoke;
            }
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            //To do : after the action executes  
        }
    }


 * */
