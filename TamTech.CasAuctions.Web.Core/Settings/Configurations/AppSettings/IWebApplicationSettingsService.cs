using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TamTech.CasAuctions.Web.Core.Models.EmailModels;

namespace TamTech.CasAuctions.Web.Core.Settings.Configurations.AppSetting
{
    public interface IWebApplicationSettingsService
    { 

        Guid GetHomePageSummuryId(); 

        string GetMainMenuKey();

        string GetHomePageMainSliderKey();

        string GetHomePageCarouselSliderKey();

        bool DisplayTokenInWebView();

        bool CacheMenus();

        EmailFromInfo GetEmailSettings();

        string GetVersion();

        string GetURl();
 

        List<string> GetAvailableModulesOfMenuItemsTypes();
        List<string> GetNumericalStatisticsModulesNames();
    }
}
