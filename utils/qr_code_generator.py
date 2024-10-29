import io
import qrcode

from config.constants import BASE_URL

class QRCodeGenerator:
    '''
    Class to generate QR codes'''
    
    def generate_qr_code(self, activity, list_name):
        '''
        Generates a QR code for a given activity and list name
        
        Returns the QR code as bytes
        '''

        url = f"{BASE_URL}/gamestart?activity={activity}&list={list_name}"
        
        # Generate the QR code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(url)
        qr.make(fit=True)
        img = qr.make_image(fill='black', back_color='white')

        # Save the image to a bytes buffer
        img_buffer = io.BytesIO()
        img.save(img_buffer, format='PNG')
        img_buffer.seek(0)
        
        return img_buffer.getvalue()
