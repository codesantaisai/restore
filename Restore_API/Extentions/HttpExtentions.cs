using Azure;
using Restore_API.Models;
using Restore_API.RequestHandler;
using System.Text.Json;

namespace Restore_API.Extentions
{
    public static class HttpExtentions
    {
        public static void AddPaginationHeader(this HttpResponse httpResponse, MetaData metaData)
        {
            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
            httpResponse.Headers.Append("Pagination", JsonSerializer.Serialize(metaData, options));
            httpResponse.Headers.Append("Access-Control-Expose-Headers", "Pagination");

        }
    }
}
