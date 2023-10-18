import torch
from PIL import Image

# 모델 구조를 정의합니다 (YOLOv5s 예시)
model = torch.hub.load('ultralytics/yolov5', 'yolov5n', pretrained=False)

# 학습한 가중치를 불러옵니다
weights = 'best3.pt'  # 실제 경로로 바꿔주세요
model.load_state_dict(torch.load(weights))

# 모델을 평가 모드로 설정합니다
model.eval()

# 이미지를 불러옵니다.
image_path = 'path/to/your/image.jpg'  # 실제 경로로 바꿔주세요
img = Image.open(image_path)

# 이미지를 Tensor 형태로 변환합니다.
img_tensor = transforms.ToTensor()(img).unsqueeze_(0)

# 예측 결과를 얻습니다.
results = model(img_tensor)

print(results.xyxy[0])  # bounding box 좌표 출력
