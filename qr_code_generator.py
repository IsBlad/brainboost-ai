import qrcode
import os
from PIL import Image
from config.constants import BASE_URL, QR_CODE_DIR

class QRCodeGenerator:
    '''Class to generate QR codes'''
    
    def generate_qr_code(self, activity, list_name):
        url = f"{BASE_URL}/gamestart?activity={activity}&list={list_name}"
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
        os.makedirs(QR_CODE_DIR, exist_ok=True)
        
        # Save the image
        try:
            save_path = os.path.join(QR_CODE_DIR, f"{activity}_{list_name}.png")
            img.save(save_path)
        except Exception as e:
            print(f"An error occurred while saving the QR code: {str(e)}")
            return None
        
        return save_path
