from flask import Flask,jsonify, request, session
from werkzeug.utils import secure_filename
from flask_cors import CORS
from tensorflow.keras.preprocessing import image
import numpy as np
from tensorflow.keras.models import load_model



def create_foodlist():
    list_=['apple_pie', 'baby_back_ribs', 'baklava', 'beef_carpaccio',
     'beef_tartare', 'beet_salad', 'beignets', 'bibimbap', 'bread_pudding',
      'breakfast_burrito', 'bruschetta', 'caesar_salad', 'cannoli', 'caprese_salad',
       'carrot_cake', 'ceviche', 'cheese_plate', 'cheesecake', 'chicken_curry', 'chicken_quesadilla',
        'chicken_wings', 'chocolate_cake', 'chocolate_mousse', 'churros', 'clam_chowder', 'club_sandwich',
         'crab_cakes', 'creme_brulee', 'croque_madame', 'cup_cakes', 'deviled_eggs', 'donuts', 'dumplings', 
         'edamame', 'eggs_benedict', 'escargots', 'falafel', 'filet_mignon', 'fish_and_chips', 'foie_gras',
          'french_fries', 'french_onion_soup', 'french_toast', 'fried_calamari', 'fried_rice', 'frozen_yogurt',
           'garlic_bread', 'gnocchi', 'greek_salad', 'grilled_cheese_sandwich', 'grilled_salmon', 'guacamole', 'gyoza', 
           'hamburger', 'hot_and_sour_soup', 'hot_dog', 'huevos_rancheros', 'hummus', 'ice_cream', 'lasagna', 
           'lobster_bisque', 'lobster_roll_sandwich', 'macaroni_and_cheese', 'macarons', 'miso_soup', 'mussels',
            'nachos', 'omelette', 'onion_rings', 'oysters', 'pad_thai', 'paella', 'pancakes', 'panna_cotta', 
            'peking_duck', 'pho', 'pizza', 'pork_chop', 'poutine', 'prime_rib', 'pulled_pork_sandwich', 'ramen', 
            'ravioli', 'red_velvet_cake', 'risotto', 'samosa', 'sashimi', 'scallops', 'seaweed_salad', 'shrimp_and_grits',
             'spaghetti_bolognese', 'spaghetti_carbonara', 'spring_rolls', 'steak', 'strawberry_shortcake',
              'sushi', 'tacos', 'takoyaki', 'tiramisu', 'tuna_tartare', 'waffles']
    return list_
food_cal={
    'apple_pie': { 'Carbohydrate': 34, 'fat': 11, 'calories': 237, 'protein': 1.9 },
    'baby_back_ribs': { 'Carbohydrate': 0, 'fat': 31, 'calories': 361, 'protein': 21 },
    'baklava': { 'Carbohydrate': 39, 'fat': 26, 'calories': 403, 'protein': 7.2 },
    'beef_carpaccio': { 'Carbohydrate': 0, 'fat': 2.62, 'calories': 119, 'protein': 22.31 },
    'beef_tartare': { 'Carbohydrate': 2.6, 'fat': 20, 'calories': 246, 'protein': 15 },
    'beet_salad': { 'Carbohydrate': 9.4, 'fat': 20, 'calories': 231, 'protein': 4.3 },
    'beignets': { 'Carbohydrate': 44, 'fat': 9.4, 'calories': 291, 'protein': 6.6 },
    'bibimbap': { 'Carbohydrate': 18, 'fat': 2.6, 'calories': 113, 'protein': 4.3 },
    'bread_pudding': { 'Carbohydrate': 36, 'fat': 3.7, 'calories': 188, 'protein': 3.8 },
    'breakfast_burrito': { 'Carbohydrate': 19, 'fat': 7.2, 'calories': 169, 'protein': 7.4 },
    'bruschetta': { 'Carbohydrate': 18, 'fat': 14, 'calories': 206, 'protein': 3.8 },
    'caesar_salad': { 'Carbohydrate': 7.5, 'fat': 13, 'calories': 158, 'protein': 3.3 },
    'cannoli': { 'Carbohydrate': 23, 'fat': 19, 'calories': 293, 'protein': 7.5 },
    'caprese_salad': { 'Carbohydrate': 2.9, 'fat': 10, 'calories': 136, 'protein': 8.2 },
    'carrot_cake': { 'Carbohydrate': 42, 'fat': 17, 'calories': 333, 'protein': 3.8 },
    'ceviche': { 'Carbohydrate': 2.2, 'fat': 1.1, 'calories': 68, 'protein': 13 },
    'cheesecake': { 'Carbohydrate': 26, 'fat': 23, 'calories': 321, 'protein': 5.5 },
    'cheese_plate': { 'Carbohydrate': 4.5, 'fat': 29, 'calories': 389, 'protein': 26 },
    'chicken_curry': { 'Carbohydrate': 3.2, 'fat': 4.6, 'calories': 104, 'protein': 12 },
    'chicken_quesadilla': { 'Carbohydrate': 19, 'fat': 10, 'calories': 219, 'protein': 12 },
    'chicken_wings': { 'Carbohydrate': 9.8, 'fat': 24, 'calories': 328, 'protein': 17 },
    'chocolate_cake': { 'Carbohydrate': 53, 'fat': 20, 'calories': 389, 'protein': 3.5 },
    'chocolate_mousse': { 'Carbohydrate': 16, 'fat': 16, 'calories': 225, 'protein': 4.1 },
    'churros': { 'Carbohydrate': 32, 'fat': 29, 'calories': 396, 'protein': 1.8 },
    'clam_chowder': { 'Carbohydrate': 8.3, 'fat': 3.9, 'calories': 79, 'protein': 2.6 },
    'club_sandwich': { 'Carbohydrate': 12, 'fat': 13, 'calories': 234, 'protein': 16 },
    'crab_cakes': { 'Carbohydrate': 15, 'fat': 23, 'calories': 362, 'protein': 23 },
    'creme_brulee': { 'Carbohydrate': 30, 'fat': 60, 'calories': 687, 'protein': 8.3 },
    'croque_madame': { 'Carbohydrate': 57, 'fat': 38, 'calories': 721, 'protein': 37 },
    'cup_cakes': { 'Carbohydrate': 40, 'fat': 15, 'calories': 292, 'protein': 2.6 },
    'deviled_eggs': { 'Carbohydrate': 0.5, 'fat': 5.8, 'calories': 68, 'protein': 3.2 },
    'donuts': { 'Carbohydrate': 29, 'fat': 14, 'calories': 253, 'protein': 3.7 },
    'dumplings': { 'Carbohydrate': 12, 'fat': 1.7, 'calories': 74, 'protein': 2 },
    'nachos': { 'Carbohydrate': 32, 'fat': 17, 'calories': 306, 'protein': 8 },
    'omelette': { 'Carbohydrate': 0.6, 'fat': 12, 'calories': 154, 'protein': 11 },
    'onion_rings': { 'Carbohydrate': 44, 'fat': 25, 'calories': 411, 'protein': 3.9 },
    'oysters': { 'Carbohydrate': 12, 'fat': 13, 'calories': 199, 'protein': 9 },
    'pad_thai': { 'Carbohydrate': 14.9, 'fat': 11, 'calories': 237, 'protein': 1.9 },
    'paella': { 'Carbohydrate': 17, 'fat': 5, 'calories': 135, 'protein': 4.9 },
    'pancakes': { 'Carbohydrate': 28, 'fat': 10, 'calories': 277, 'protein': 6 },
    'panna_cotta': { 'Carbohydrate': 11.73, 'fat': 22.33, 'calories': 204, 'protein': 2.27 },
    'peking_duck': { 'Carbohydrate': 0.3, 'fat': 24, 'calories': 331, 'protein': 28 },
    'pho': { 'Carbohydrate': 12.78, 'fat': 2.3, 'calories': 67, 'protein': 5.77 },
    'pizza': { 'Carbohydrate': 26, 'fat': 10.1, 'calories': 237, 'protein': 10.6 },
    'pork_chop': { 'Carbohydrate': 0, 'fat': 6.85, 'calories': 118, 'protein': 13.12 },
    'poutine': { 'Carbohydrate': 44, 'fat': 30, 'calories': 510, 'protein': 17 },
    'prime_rib': { 'Carbohydrate': 0, 'fat': 7.27, 'calories': 112, 'protein': 10.88 },
    'pulled_pork_cake': { 'Carbohydrate': 9.07, 'fat': 22.59, 'calories': 401, 'protein': 38.92 },
    'ramen': { 'Carbohydrate': 26, 'fat': 7, 'calories': 26, 'protein': 4 },
    'ravioli': { 'Carbohydrate': 32.35, 'fat': 10.72, 'calories': 285, 'protein': 13.58 },
    'red_velvet_cake': { 'Carbohydrate': 37.45, 'fat': 13.74, 'calories': 293, 'protein': 5.45 },
    'risotto': { 'Carbohydrate': 27, 'fat': 1.5, 'calories': 140, 'protein': 5 },
    'samosa': { 'Carbohydrate': 21, 'fat': 10, 'calories': 190, 'protein': 4 },
    'sashimi': { 'Carbohydrate': 0, 'fat': 41, 'calories': 41, 'protein': 6.13 },
    'scallops': { 'Carbohydrate': 1.68, 'fat': 1.75, 'calories': 35, 'protein': 2.9 },
    'seaweed_salad': { 'Carbohydrate': 23, 'fat': 4.5, 'calories': 130, 'protein': 3 },
    'shrimp_and_grits': { 'Carbohydrate': 34, 'fat': 19, 'calories': 380, 'protein': 20 },
    'spaghetti_bolognese': { 'Carbohydrate': 42.28, 'fat': 12.73, 'calories': 364, 'protein': 17.73 },
    'spaghetti_carbonara': { 'Carbohydrate': 42.95, 'fat': 1.29, 'calories': 220, 'protein': 8.06 },
    'spring_rolls': { 'Carbohydrate': 13, 'fat': 5, 'calories': 110, 'protein': 3 },
    'steak': { 'Carbohydrate': 0, 'fat': 14.84, 'calories': 251, 'protein': 27.4 },
    'strawberry_shortcake': { 'Carbohydrate': 26, 'fat': 12, 'calories': 220, 'protein': 2 },
    'sushi': { 'Carbohydrate': 7.77, 'fat': 0.11, 'calories': 37, 'protein': 1.12 },
    'tacos': { 'Carbohydrate': 15.63, 'fat': 12.02, 'calories': 216, 'protein': 12.08 },
    'takoyaki': { 'Carbohydrate': 7.11, 'fat': 3.02, 'calories': 70, 'protein': 3.38 },
    'tiramisu': { 'Carbohydrate': 42.47, 'fat': 31.67, 'calories': 492, 'protein': 8.3 },
    'tuna_tartare': { 'Carbohydrate': 15, 'fat': 16, 'calories': 307, 'protein': 11 },
    'waffles': { 'Carbohydrate': 26.60, 'fat': 12.1, 'calories': 241, 'protein': 5.7 },
    'edamame': { 'Carbohydrate': 8.9, 'fat': 5.2, 'calories': 121, 'protein': 12 },
    'eggs_benedict': { 'Carbohydrate': 11, 'fat': 19, 'calories': 260, 'protein': 11 },
    'escargots': { 'Carbohydrate': 2, 'fat': 1.4, 'calories': 90, 'protein': 16 },
    'falafel': { 'Carbohydrate': 19, 'fat': 37, 'calories': 416, 'protein': 5.4 },
    'filet_mignon': { 'Carbohydrate': 0, 'fat': 17, 'calories': 267, 'protein': 26 },
    'fish_and_chips': { 'Carbohydrate': 14, 'fat': 5, 'calories': 134, 'protein': 8.3 },
    'foie_gras': { 'Carbohydrate': 4.7, 'fat': 44, 'calories': 462, 'protein': 11 },
    'french_fries': { 'Carbohydrate': 41, 'fat': 15, 'calories': 312, 'protein': 3.4 },
    'french_onion_soup': { 'Carbohydrate': 11, 'fat': 6.8, 'calories': 137, 'protein': 6 },
    'french_toast': { 'Carbohydrate': 28, 'fat': 13, 'calories': 263, 'protein': 8.7 },
    'fried_calamari': { 'Carbohydrate': 26, 'fat': 10, 'calories': 249, 'protein': 12 },
    'fried_rice': { 'Carbohydrate': 33, 'fat': 3, 'calories': 174, 'protein': 4.1 },
    'frozen_yogurt': { 'Carbohydrate': 22, 'fat': 3.6, 'calories': 127, 'protein': 3 },
    'garlic_bread': { 'Carbohydrate': 42, 'fat': 17, 'calories': 350, 'protein': 8.4 },
    'gnocchi': { 'Carbohydrate': 41, 'fat': 1.2, 'calories': 201, 'protein': 6 },
    'greek_salad': { 'Carbohydrate': 4.7, 'fat': 9.4, 'calories': 113, 'protein': 3.2 },
    'grilled_cheese_sandwich': { 'Carbohydrate': 27, 'fat': 22, 'calories': 344, 'protein': 11 },
    'grilled_salmon': { 'Carbohydrate': 0, 'fat': 12, 'calories': 206, 'protein': 22 },
    'guacamole': { 'Carbohydrate': 8.5, 'fat': 14, 'calories': 151, 'protein': 1.8 },
    'gyoza': { 'Carbohydrate': 20, 'fat': 10, 'calories': 211, 'protein': 9.4 },
    'hamburger': { 'Carbohydrate': 18, 'fat': 12, 'calories': 239, 'protein': 15 },
    'hot_and_sour_soup': { 'Carbohydrate': 4.4, 'fat': 1.2, 'calories': 39, 'protein': 2.6 },
    'hot_dog': { 'Carbohydrate': 2.7, 'fat': 29, 'calories': 322, 'protein': 12 },
    'huevos_rancheros': { 'Carbohydrate': 8.7, 'fat': 9.5, 'calories': 143, 'protein': 6.3 },
    'hummus': { 'Carbohydrate': 14, 'fat': 9.6, 'calories': 166, 'protein': 7.9 },
    'ice_cream': { 'Carbohydrate': 24, 'fat': 11, 'calories': 207, 'protein': 3.5 },
    'lasagna': { 'Carbohydrate': 9, 'fat': 8.4, 'calories': 156, 'protein': 11 },
    'lobster_bisque': { 'Carbohydrate': 3.7, 'fat': 6.6, 'calories': 106, 'protein': 6.5 },
    'lobster_roll_sandwich': { 'Carbohydrate': 13, 'fat': 8.5, 'calories': 199, 'protein': 17 },
    'macaroni_and_cheese': { 'Carbohydrate': 24, 'fat': 8.3, 'calories': 190, 'protein': 4.9 },
    'macarons': { 'Carbohydrate': 53, 'fat': 17, 'calories': 384, 'protein': 7.5 },
    'miso_soup': { 'Carbohydrate': 1.5, 'fat': 1.2, 'calories': 24, 'protein': 2.4 },
    'mussels': { 'Carbohydrate': 7.4, 'fat': 4.5, 'calories': 172, 'protein': 24 }
}

ALLOWED_EXTENSIONS = set([ 'png', 'jpg', 'jpeg'])

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])

def fileUpload():
    # uploading file to destination folder
    file = request.files['file']
    filename = secure_filename(file.filename)
    destination="/".join(['static', filename])
    file.save(destination)

    # load the model
    model = load_model('model_trained.h5', compile = False)
    #image resizing
    img = image.load_img(destination, target_size=(299, 299))
    img = image.img_to_array(img)                    
    img = np.expand_dims(img, axis=0)         
    img /= 255.                                      

    pred = model.predict(img)
    index = np.argmax(pred)
    val= np.amax(pred)
    print(val)
    pred_value = food_list[index]
    if val<0.2:
        pred_value="Not a food item !"
        return jsonify(pred_value)
    ret={'value':pred_value,'cal':food_cal[pred_value]}
    print(ret)
    return ret

if __name__ == "__main__":
    food_list = create_foodlist()
    app.run(debug=True,host="0.0.0.0",use_reloader=False)
