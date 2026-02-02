// 照片数据 - 你需要根据每个人修改这些数据

// 在 openPhotoModal 函数开头添加诊断
function openPhotoModal(photoId) {
    console.log("openPhotoModal called with ID:", photoId);
    
    currentPhotoId = photoId;
    const photo = photoData[photoId];
    
    if (photo) {
        const modalPhoto = document.getElementById('modalPhoto');
        const modalContainer = document.querySelector('.modal-photo-container');
        
        console.log("Modal elements found:", modalPhoto, modalContainer);
        
        // 重置缩放状态
        isZoomed = false;
        
        // 设置图片源
        console.log("Setting image src to:", photo.image);
        modalPhoto.src = photo.image;
        
        // 强制应用contain样式
        setTimeout(() => {
            modalPhoto.style.objectFit = 'contain';
            modalPhoto.style.width = 'auto';
            modalPhoto.style.height = 'auto';
            modalPhoto.style.maxWidth = '100%';
            modalPhoto.style.maxHeight = '70vh';
            
            console.log("Image dimensions after load:", 
                modalPhoto.naturalWidth, "x", modalPhoto.naturalHeight);
            console.log("Current objectFit:", modalPhoto.style.objectFit);
        }, 100);
        
        // 其他代码保持不变...
    }
}const photoData = {
    1: {
        image: '../images/karl 1.jpg',
        title: 'talking Mr. karl',
        date: 'when Mr.Karl was younger',
        description: 'Your voice is pretty unique.'
    },
    2: {
        image: '../images/karl 2.jpg',
        title: 'playing chess',
        date: 'competition date',
        description: 'Your command in chess really shows intelligence.'
    },
    3: {
        image: '../images/karl 3.jpg',
        title: 'hhhh',
        date: 'a common school day',
        description: 'focused karl'
    },
    4: {
        image: '../images/karl 4.jpg',
        title: 'on class',
        date: 'a common school day',
        description: 'with laughter in eyes'
    },
    5: {
        image: '../images/karl 5.jpg',
        title: 'beard karl',
        date: 'a common school day',
        description: 'handsome karl'
    },
    6: {
        image: '../images/karl 6.jpg',
        title: 'a creepshot hahahha',
        date: 'a common school day',
        description: 'Mr. Karl likes sitting on table'
    },
    7: {
        image: '../images/karl 7.jpg',
        title: 'laughing karl',
        date: 'a common school day',
        description: 'I like your smile'
    },
    8: {
        image: '../images/karl 8.jpg',
        title: 'laughing karl',
        date: 'a common school day',
        description: 'I like your smile'
    },
    9: {
        image: '../images/karl 9.jpg',
        title: 'laughing karl',
        date: 'a common school day',
        description: 'I like your smile'
    },
    10: {
        image: '../images/karl 10.jpg',
        title: 'big muscle',
        date: 'a Sunday',
        description: 'Strong Karl'
    },
    11: {
        image: '../images/karl 11.jpg',
        title: 'listening student"s project',
        date: 'date known',
        description: 'I like your side face'
    },
    12: {
        image: '../images/karl 12.jpg',
        title: 'working karl',
        date: 'after final exam',
        description: 'Mr Karl is bad at multitasking.'
    },
    13: {
        image: '../images/karl 13.jpg',
        title: 'karl"s high five',
        date: '忘记了',
        description: 'Karl"s fatial expression is always very unique.'
    }
};

let currentPhotoId = 1;
let isZoomed = false; // 添加变量跟踪缩放状态

// 打开照片模态框 - 修复版
function openPhotoModal(photoId) {
    currentPhotoId = photoId;
    const photo = photoData[photoId];
    
    if (photo) {
        // 获取模态框元素
        const modalPhoto = document.getElementById('modalPhoto');
        const modalContainer = document.querySelector('.modal-photo-container');
        
        // 重置缩放状态
        isZoomed = false;
        
        // 设置图片和内容
        modalPhoto.src = photo.image;
        modalPhoto.alt = photo.title;
        document.getElementById('modalTitle').textContent = photo.title;
        document.getElementById('modalDate').textContent = photo.date;
        document.getElementById('modalDescription').innerHTML = 
            `<p>${photo.description.replace(/\n\n/g, '</p><p>')}</p>`;
        
        // 重置图片样式
        modalPhoto.style.transform = 'scale(1)';
        modalPhoto.style.cursor = 'zoom-in';
        modalPhoto.style.maxWidth = '100%';
        modalPhoto.style.maxHeight = '70vh';
        
        // 显示模态框
        document.getElementById('photoModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // 添加点击事件来缩放图片
        modalPhoto.onclick = function(event) {
            event.stopPropagation(); // 防止触发模态框关闭
            toggleZoom();
        };
    }
}

// 添加图片缩放函数
function toggleZoom() {
    const modalPhoto = document.getElementById('modalPhoto');
    const modalContainer = document.querySelector('.modal-photo-container');
    
    if (!isZoomed) {
        // 放大模式 - 显示完整图片
        modalPhoto.style.maxWidth = 'none';
        modalPhoto.style.maxHeight = 'none';
        modalPhoto.style.cursor = 'zoom-out';
        modalContainer.style.overflow = 'auto';
        isZoomed = true;
    } else {
        // 恢复模式
        modalPhoto.style.maxWidth = '100%';
        modalPhoto.style.maxHeight = '70vh';
        modalPhoto.style.cursor = 'zoom-in';
        modalContainer.style.overflow = 'auto';
        isZoomed = false;
    }
}

// 关闭模态框
function closePhotoModal() {
    isZoomed = false; // 重置缩放状态
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