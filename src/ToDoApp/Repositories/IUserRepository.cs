using System.Collections.Generic;
using System.Threading.Tasks;
using ToDoApp.Models;

namespace ToDoApp.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUserByUsername(string username);
        Task<User> GetUserWithPasswordByUsername(string username);
        Task Insert(User user, string password);
        Task<bool> Exists(string username);
    }
}
