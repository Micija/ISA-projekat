

using ZXing.QrCode;
using ZXing;
using System.Drawing;

namespace ISA.API.Services.Util.QrCode;

public interface IQrCodeService
{
    byte[] CreateQRCode(string text);
}
