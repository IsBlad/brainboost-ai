import qrcode
import os
from PIL import Image

class QRCodeGenerator:
    '''Class to generate QR codes'''
    
    def generate_qr_code(self, url, filename):
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(url)
        qr.make(fit=True)
        img = qr.make_image(fill='black', back_color='white')

        # Ensure the directory exists
        save_dir = 'static/img/qrcodes'
        os.makedirs(save_dir, exist_ok=True)
        
        # Save the image
        try:
            save_path = os.path.join(save_dir, f'{filename}.png')
            img.save(save_path)
        except Exception as e:
            print(f"An error occurred while saving the QR code: {str(e)}")
            return None
        
        return save_path
