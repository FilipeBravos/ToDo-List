using ToDoApp.Models;

namespace ToDoApp.Services
{
    public interface ITokenService
    {
        string GenerateToken(User user);
    }
}
