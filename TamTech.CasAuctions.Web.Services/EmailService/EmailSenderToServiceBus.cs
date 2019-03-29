using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TamTech.CasAuctions.Web.Core.Models.EmailModels;
using TamTech.CasAuctions.Web.Core.Settings.ServiceBus;
using TamTech.CasAuctions.Web.Services.ServiceBus;

namespace TamTech.CasAuctions.Web.Services.Email
{ 
    public class EmailSenderToServiceBus : IEmailSenderService
    {
        #region Props  
        private readonly IServiceBus _serviceBus;
        private readonly ServiceBusSettings _settings;
        #endregion

        #region Ctors
        public EmailSenderToServiceBus(ServiceBusSettings settings,  IServiceBus serviceBus)
        {
            _settings = settings;
            _serviceBus = serviceBus;
        }
        #endregion


        #region Services  
        public async Task<bool> SendAsync(EmailModel model, string userId = "", string clientId = "", List<string> userRoles = null)
        {
            var emailModel = new EmailServiceModel
            {
                Recipients = model.Email,
                Subject = model.Subject,
                Text = model.Message,
                Html = model.HtmlMessage,
                ReasonOfSend = model.ReasonOfSend,
                UserId = userId,
                ClientId = clientId,
                UserRoles = userRoles
            };
          return  await _serviceBus.SendQueueAsync(_settings, emailModel);
        }
        #endregion

    }

}
