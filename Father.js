// 照片数据 - 你需要根据每个人修改这些数据
const photoData = {
    1: {
        image: '../images/father1.jpg',
        title: '内蒙古之游',
        date: '2023年9月30日',
        description: '那天的阳光特别明媚，就像我们的笑容一样灿烂。路边有很多牛，看见我和妈妈都躲，只有你能摸摸它们。'
    },
    2: {
        image: '../images/father2.jpg',
        title: '颐和园之游',
        date: '2023年11月4日',
        description: '颐和园的秋景特别美，我们一起去散步，你走得特别慢，我特别开心。'
    },
    3: {
        image: '../images/father3.jpg',
        title: '难忘的生日惊喜',
        date: '2024年11月16日',
        description: '我们一起去凤凰岭爬山，我爬得特别快，你很高兴很感慨，觉得我长大了。'
    },
    
    4: {
        image: '../images/father4.jpg',
        title: '视频通话截图',
        date: '忘记了',
        description: '视频通话的时候，我总是喜欢截屏，觉得我爸特别可爱，尤其是他喝水的样子。'
    }
};

let currentPhotoId = 1;

// 打开照片模态框
function openPhotoModal(photoId) {
    currentPhotoId = photoId;
    const photo = photoData[photoId];
    
    if (photo) {
        document.getElementById('modalPhoto').src = photo.image;
        document.getElementById('modalPhoto').alt = photo.title;
        document.getElementById('modalTitle').textContent = photo.title;
        document.getElementById('modalDate').textContent = photo.date;
        document.getElementById('modalDescription').innerHTML = 
            `<p>${photo.description.replace(/\n\n/g, '</p><p>')}</p>`;
        
        document.getElementById('photoModal').style.display = 'block';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }
}

// 关闭模态框
function closePhotoModal() {
    document.getElementById('photoModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// 上一张照片
function prevPhoto() {
    currentPhotoId = currentPhotoId > 1 ? currentPhotoId - 1 : Object.keys(photoData).length;
    openPhotoModal(currentPhotoId);
}

// 下一张照片
function nextPhoto() {
    const totalPhotos = Object.keys(photoData).length;
    currentPhotoId = currentPhotoId < totalPhotos ? currentPhotoId + 1 : 1;
    openPhotoModal(currentPhotoId);
}

// 点击模态框外部关闭
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('photoModal');
    
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closePhotoModal();
        }
    });
    
    // 键盘导航
    document.addEventListener('keydown', function(event) {
        if (modal.style.display === 'block') {
            if (event.key === 'Escape') {
                closePhotoModal();
            } else if (event.key === 'ArrowLeft') {
                prevPhoto();
            } else if (event.key === 'ArrowRight') {
                nextPhoto();
            }
        }
    });
    
    // 添加照片悬停效果
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const caption = this.querySelector('.photo-caption');
            caption.style.transform = 'translateY(-10px)';
            caption.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            const caption = this.querySelector('.photo-caption');
            caption.style.transform = 'translateY(0)';
            caption.style.boxShadow = 'none';
        });
    });
});