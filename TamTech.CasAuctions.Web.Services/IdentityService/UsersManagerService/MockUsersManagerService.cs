using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using TamTech.CasAuctions.Web.Core.Models.IdentityModels;
using TamTech.CasAuctions.Web.Core.Models.Requests;
using TamTech.CasAuctions.Web.Services.Identity;

namespace TamTech.CasAuctions.Web.Services.IdentityService.UsersManagerService
{
    public class MockUsersManagerService : IUsersManagerService
    {

        private Random _random;
        private string[] Names = {
            "Debbra Doris","Dortha Diener","Hee Hough","Stacee Standish","Giovanna Gaspar","Armand Allmon",
            "Annie Allsup","Lorena Langer","Kamala Kahler","Beatrice Bjornson","Charolette Conforti","Cyrstal Culler",
            "Hershel Hardge","Marcelina Meserve","Sydney Speaker","Modesto Mclin","Tien Thomasson","Reyna Reddington",
            "Tracey Turmelle","Cordell Caryl","Merrie Mclamb","Rodney Rivas","Conchita Clasen",
            "Michelle Melius","Stacia Sester","Cherly Crosley","Rafael Rinaldo","Stepanie Spradling",
            "Ling Lade","Matha Mckissick","Dulce Davies","Stephnie Salcido","Garrett Guidi","Lizabeth Lloyd",
            "Georgianna Giuffre","Kara Keeley","Crista Caulfield","Arcelia Andrews","Garth Grayson",
            "Lorie Leverett","Laverna Livingstone","Patience Pflum","Ellyn Elsberry","Solomon Soucy",
            "Elke Ellingson","Alvaro Altizer","Gaston Gorham","Micki Mcsween","Alysia Alton","Katlyn Kobayashi" };

        private string[] Emails =
        {
            "hintz.chloe@hotmail.com","rruecker@gmail.com","haag.mathias@nolan.com",
            "vivienne.koepp@gmail.com","lavina.daniel@bechtelar.com","marquis77@gmail.com",
            "nola.marquardt@gmail.com","madison.quitzon@block.org","lynn81@kub.com",
            "wmcglynn@hotmail.com","cmarks@hotmail.com","beier.michelle@gmail.com",
            "larkin.gunner@stroman.com","raymundo.ferry@gmail.com","oreilly.paula@yahoo.com"
        };

        private string[] usernames =
        {
            "fitsshine","acrylicskylark","improvementremake","groomshameful","bowsslackbridge","snacksshelter","garnetmomentum",
            "puppytrent","herpesdigit","glaucouspreacher","skinnedenchantment","importanceyeast","mochatrash","marryswim",
            "ridglingdepressed","sittermonastery","rigorbullhorn","spendingpercy","flashpagan","pixybotany","rustygale","saltyficky",
            "grimacingcrimson","reflectivehyphen","tacticsconfetti","lonsterjosephine","dodgytok","accentortilly","feetshypothesis",
            "normalfortymile","catnipgoldfinch","chunkcombustible",
            "refreshrake","artlessunderfeed"
        };

        private string[] phonenumbers =
        {
              "4284744681","2184788593","6884910781","5116258121","2767012248","6043871173",
              "3319574303","2872305236","3427685666","5429709536","4719624358","6639142651",
              "8994742396","7902522694","2329230309","6557036381","2892256954","6863754051",
              "9345244755","5942981579","5327799608","2356698356","3493309015","5417404287",
              "2786424099","5307762471","7828934721","2038653179","2426528456","2846197213"
        };


        public MockUsersManagerService()
        {
            _random = new Random();
        }

        public UserModel FakeUserModel()
        {

            return new UserModel
            {
                Name = Names[_random.Next(0, Names.Length - 1)],
                Id = Guid.NewGuid().ToString(),
                MobileNumberConfirmed = _random.Next(50) % 2 == 0,
                MobileNumber = phonenumbers[_random.Next(0, phonenumbers.Length - 1)],
                EmailConfirmed = _random.Next(50) % 2 == 0,
                Email = Emails[_random.Next(0, Emails.Length - 1)] ,
                UserName = usernames[_random.Next(0,usernames.Length - 1)],
                LockoutEnabled = _random.Next(50) % 2 == 0,
                AccessFailedCount = _random.Next(50),
                ImageUrl = $"/images/avatar.png",
                Gender = _random.Next(50) % 2 == 0 ? "m" : "f",
                IsLockout = _random.Next(50) % 2 == 0,
                IsBlocked = _random.Next(50) % 2 == 0
            };
        }


        public Task<IRequestProviderResult<bool>> BlockUserAsync(UserNameModel model)
        {
            throw new NotImplementedException();
        }

        public Task<IRequestProviderResult<UserModel>> GetUserByUsernameAsync(string username)
        {
            throw new NotImplementedException();
        }

        public Task<IRequestProviderResult<List<UserModel>>> GetUsersAsync(GetUsersModel model)
        {
            throw new NotImplementedException();
        }

        public Task<IRequestProviderResult<bool>> RegisterUserAsync(RegisterUserModel data)
        {
            throw new NotImplementedException();
        }

        public Task<IRequestProviderResult<bool>> UnblockUserAsync(UserNameModel model)
        {
            throw new NotImplementedException();
        }
    }
}
