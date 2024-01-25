using System.Drawing;
using ZXing.QrCode;
using ZXing;

namespace ISA.API.Services.Util.QrCode;

public class QrCodeService: IQrCodeService
{
    public byte[] CreateQRCode(string text)
    {
        var barcodeWriter = new BarcodeWriterPixelData
        {
            Format = BarcodeFormat.QR_CODE,
            Options = new QrCodeEncodingOptions
            {
                Width = 300,
                Height = 300
            }
        };

        var qrCodeBitmap = barcodeWriter.Write(text);
        return qrCodeBitmap.Pixels;

    }
}
