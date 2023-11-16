import os
from flask import Flask, request, jsonify
import cv2
import torch
import torchvision.transforms as T
from PIL import Image
from ultralytics import YOLO

app = Flask(__name__)

# Load the YOLOv5 model
#model = torch.hub.load('ultralytics/ultralytics', 'custom', path='best_1110.pt')
model = YOLO("last_v81113.pt")

@app.route('/predict', methods=['POST'])
def predict():
    print('######################')
    # Get the uploaded image file
    image_file = request.files['image']

    # 저장할 파일 경로
    save_path = os.path.join('./', image_file.filename)

    # Load the image
    image = Image.open(image_file)

    # 이미지 저장
    image.save(save_path)
    #image = cv2.imread(image_file, cv2.IMREAD_COLOR)

    # Preprocess the image
    transform = T.Compose([
        T.Resize((640, 640)),  # Resize the image to the model's input size
        T.ToTensor()  # Convert the image to tensor
    ])

    preprocessed_image = transform(image)

    # 이미지 저장
    preprocessed_image_pil = T.ToPILImage()(preprocessed_image)  # Tensor를 PIL 이미지로 변환
    preprocessed_image_pil.save(save_path)


    input_image = transform(image)

    # Add a batch dimension to the input image
    input_image = input_image.unsqueeze(0)

    # Run inference on the input image
    results = model(input_image, conf=0.25)
    print('@@@results@@@')
    print(results)
    
    boxes = results[0].boxes

    # for box in boxes :
    #     print('xyxy: ', box.xyxy.cpu().detach().numpy().tolist())
    #     print('conf: ', box.conf.cpu().detach().numpy().tolist())
    #     print('cls: ', box.cls.cpu().detach().numpy().tolist())

    if len(boxes) > 0:
        cls = boxes[0].cls.cpu().detach().numpy().tolist()[0]
        conf = boxes[0].conf.cpu().detach().numpy().tolist()[0]
        message_value = True
    else:
        cls = None
        message_value = False

    # print('######################')

    response_data ={
        'message': message_value,
        'cls': cls,
        'conf': conf,
    }

    # Clear the results variable
    results = None
    
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
