using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks; 

using TamTech.CasAuctions.Web.App.Services.Configurations.AppSetting.Constants;
using TamTech.CasAuctions.Web.Core.Models.EmailModels;
using TamTech.CasAuctions.Web.Core.Settings.Configurations.AppSetting;

namespace CasAdmin.Services.Configurations.AppSetting
{
    public class AppSettingsConfigurations : IAppSettingsConfigurations
    {

        #region Props 
        private readonly IConfiguration _configuration;
        private readonly string _contentsInfo;
        private readonly string _webApplicationSettings;
        private readonly string _directBackendSDKsSettings;
        private readonly string _emailServiceSettings;
        private readonly string _displayTokenInWebView;
        private readonly string _cacheMenus;
        private readonly string _microServicesSettings;
        private readonly string _identityServiceSettingsSection;
        private readonly string _contentnsServiceSettingsSection;
        private readonly string _uploadServiceSettingsSection;
        private readonly string _staticPagesMenu;
        private readonly string _webApplication_Configuration;
        private readonly string _webApplication_ContentsInfo;
        #endregion

        #region Ctors 
        public AppSettingsConfigurations(IConfiguration configuration,
                                                string webApplicationSettings = AppSettings.WebApplicationSettings,
                                                string directBackendSDKsSettings = AppSettings.DirectBackendSDKsSettings,
                                                string emailServiceSettings = AppSettings.DirectBackendSDK_EmailService_Settings,
                                                string displayTokenInWebView = AppSettings.WebApplication_DisplayTokenInWebView,
                                                string cacheMenus = AppSettings.WebApplication_CacheMenus,
                                                string contentsInfo = AppSettings.WebApplication_ContentsInfo,
                                                string microServicesSettings = AppSettings.MicroServicesSettings,
                                                string identityServiceSettingsSection = AppSettings.MicroServices_IdentityService,
                                                string contentnsServiceSettingsSection = AppSettings.MicroServices_ContentsService,
                                                string uploadServiceSettingsSection = AppSettings.MicroServices_UploadService,
                                                string staticPagesMenu = AppSettings.StaticPages,
                                                string webApplication_Configuration = AppSettings.WebApplication_Configuration,
                                                string webApplication_ContentsInfo = AppSettings.WebApplication_ContentsInfo
                                                )
        {
            _configuration = configuration;
            _webApplicationSettings = webApplicationSettings;
            _directBackendSDKsSettings = directBackendSDKsSettings;
            _emailServiceSettings = emailServiceSettings;
            _displayTokenInWebView = displayTokenInWebView;
            _cacheMenus = cacheMenus;
            _contentsInfo = contentsInfo;
            _microServicesSettings = microServicesSettings;
            _identityServiceSettingsSection = identityServiceSettingsSection;
            _contentnsServiceSettingsSection = contentnsServiceSettingsSection;
            _uploadServiceSettingsSection = uploadServiceSettingsSection;
            _staticPagesMenu = staticPagesMenu;
            _webApplication_Configuration = webApplication_Configuration;
            _webApplication_ContentsInfo = webApplication_ContentsInfo;
        }
        #endregion

        public string GetIdentityServiceUrl()
        {
            string url = _configuration.GetSection(_microServicesSettings).GetSection(_identityServiceSettingsSection).GetValue<string>("Url");
            return url;
        }



        public string GetContentServiceUrl()
        {
            string url = _configuration.GetSection(_microServicesSettings).GetSection(_identityServiceSettingsSection).GetValue<string>("Url");
            return url;
        }



        public string GetUploadServiceUrl()
        {
            string url = _configuration.GetSection(_microServicesSettings).GetSection(_identityServiceSettingsSection).GetValue<string>("Url");
            return url;
        }



        public Guid GetHomePageSummuryId()
        {
            Guid id = _configuration.GetSection(_webApplicationSettings).GetSection(_contentsInfo).GetValue<Guid>("HomePageSummuryId");
            return id;
        }

        public string GetMainMenuKey()
        {
            string key = _configuration.GetSection(_webApplicationSettings).GetSection(_contentsInfo).GetValue<string>("MainMenuSlug");
            return key;
        }

        public string GetHomePageMainSliderKey()
        {
            string key = _configuration.GetSection(_webApplicationSettings).GetSection(_contentsInfo).GetValue<string>("HomePageMainSlider");
            return key;
        }


        public string GetHomePageCarouselSliderKey()

        {
            string key = _configuration.GetSection(_webApplicationSettings).GetSection(_contentsInfo).GetValue<string>("HomePageCarouselSlider");
            return key;
        }

        public bool DisplayTokenInWebView()
        {
            return _configuration.GetSection(_webApplicationSettings).GetSection(_displayTokenInWebView).Get<bool>();
        }

        public bool CacheMenus()
        {
            return _configuration.GetSection(_webApplicationSettings).GetSection(_webApplication_Configuration).GetSection(_cacheMenus).Get<bool>();
        }

        public EmailFromInfo GetEmailSettings()
        {
            var emailSettings = _configuration.GetSection(_directBackendSDKsSettings).GetSection(_emailServiceSettings).Get<EmailFromInfo>();
            return emailSettings;
        }

        public string GetVersion()
        {
            string Version = _configuration.GetSection(_webApplicationSettings).GetSection(_webApplication_Configuration).GetValue<string>(AppSettings.App_Version);
            return Version;
        }

        public string GetURl()
        {
            string Url = _configuration.GetSection(_webApplicationSettings).GetSection(_webApplication_Configuration).GetValue<string>(AppSettings.App_URl);
            return Url;
        }

       
        public List<string> GetAvailableModulesOfMenuItemsTypes()
        {
            return new List<string>
            {
                     "page",
                    "section",
                    "service",
                    "gallery",
                "section_of_service",
                "section_of_gallery",
            };
        }


        public List<string> GetNumericalStatisticsModulesNames()
        {
            return new List<string>
            {
                    "page",
                    "section",
                    "service",
                    "gallery",
            };
        }
    }
}
