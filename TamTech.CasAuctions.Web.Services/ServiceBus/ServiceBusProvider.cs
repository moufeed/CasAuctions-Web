using Microsoft.Azure.ServiceBus; 
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TamTech.CasAuctions.Web.Core.Settings.ServiceBus;

namespace TamTech.CasAuctions.Web.Services.ServiceBus
{
    public class ServiceBusProvider : IServiceBus
    { 
        public async Task SendTopicAsync<T>(ServiceBusSettings settings, T model)
        { 
            var topicClient = new TopicClient(settings.ServiceBusConnectionString, settings.ServiceBusName); 
            var message = GetMessage<T>(model);
            await topicClient.SendAsync(message);
            await topicClient.CloseAsync();
        }

        public async Task<bool> SendQueueAsync<T>(ServiceBusSettings settings, T model)
        { 
                var queueClient = new QueueClient(settings.ServiceBusConnectionString, settings.ServiceBusName);
                var message = GetMessage<T>(model);
                await queueClient.SendAsync(message);
                await queueClient.CloseAsync();
            return true;
        }

        private Message GetMessage<T>(T model)
        {
            string messageBody = JsonConvert.SerializeObject(model);
            return new Message(Encoding.UTF8.GetBytes(messageBody));
        }
    }
}
