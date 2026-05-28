/**
 * 图片裁剪模块
 * 依赖: Cropper.js, FontAwesome
 * 使用方式:
 *   const cropper = new ImageCropper({ aspectRatio: 16/9 });
 *   const croppedFile = await cropper.show(file);
 */

class ImageCropper {
    constructor(options = {}) {
        this.options = {
            aspectRatio: options.aspectRatio || 16 / 9,
            viewMode: 1,
            dragMode: 'move',
            cropBoxResizable: true,
            ...options
        };
        this.modal = null;
        this.cropper = null;
        this.resolvePromise = null;
        this.rejectPromise = null;
        this.initModal();
    }
    
    initModal() {
        // 如果已存在，先移除
        const existingModal = document.querySelector('.cropper-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        this.modal = document.createElement('div');
        this.modal.className = 'cropper-modal';
        this.modal.style.display = 'none';
        
        // 设置模态框背景和内边距
        this.modal.style.backgroundColor = '#1a1a2e';
        this.modal.style.position = 'fixed';
        this.modal.style.top = '0';
        this.modal.style.left = '0';
        this.modal.style.right = '0';
        this.modal.style.bottom = '0';
        this.modal.style.zIndex = '10000';
        this.modal.style.alignItems = 'center';
        this.modal.style.justifyContent = 'center';

        this.modal.innerHTML = `
            <div class="cropper-modal-content">
                <div class="cropper-modal-header">
                    <h3><i class="fas fa-crop-alt"></i> 裁剪图片</h3>
                    <button class="cropper-modal-close">&times;</button>
                </div>
                <div class="cropper-modal-body">
                    <div class="cropper-image-container">
                        <img id="cropperImage" src="">
                    </div>
                    <div class="cropper-preview-container">
                        <div class="cropper-preview-title">预览效果</div>
                        <div class="cropper-preview" id="cropperPreview"></div>
                        <div class="cropper-controls">
                            <button class="cropper-btn-zoom-in" title="放大"><i class="fas fa-search-plus"></i></button>
                            <button class="cropper-btn-zoom-out" title="缩小"><i class="fas fa-search-minus"></i></button>
                            <button class="cropper-btn-reset" title="重置"><i class="fas fa-undo-alt"></i></button>
                        </div>
                    </div>
                </div>
                <div class="cropper-modal-footer">
                    <button class="cropper-btn-cancel">取消</button>
                    <button class="cropper-btn-confirm">确定裁剪</button>
                </div>
            </div>
        `;
        document.body.appendChild(this.modal);
        
        // 绑定事件
        const closeBtn = this.modal.querySelector('.cropper-modal-close');
        const cancelBtn = this.modal.querySelector('.cropper-btn-cancel');
        const confirmBtn = this.modal.querySelector('.cropper-btn-confirm');
        const zoomInBtn = this.modal.querySelector('.cropper-btn-zoom-in');
        const zoomOutBtn = this.modal.querySelector('.cropper-btn-zoom-out');
        const resetBtn = this.modal.querySelector('.cropper-btn-reset');
        
        closeBtn.addEventListener('click', () => this.hide('cancelled'));
        cancelBtn.addEventListener('click', () => this.hide('cancelled'));
        confirmBtn.addEventListener('click', () => this.confirm());
        
        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => this.cropper?.zoom(0.1));
        }
        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => this.cropper?.zoom(-0.1));
        }
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.cropper?.reset());
        }
        
        // 点击模态框背景关闭
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hide('cancelled');
            }
        });
    }
    
    show(file) {
        this.modal.style.display = 'flex';
        
        // 确保滚动位置重置
        const body = this.modal.querySelector('.cropper-modal-body');
        if (body) {
            body.scrollTop = 0;
        }
        
        const img = this.modal.querySelector('#cropperImage');
        const url = URL.createObjectURL(file);
        img.src = url;
        
        if (this.cropper) {
            this.cropper.destroy();
        }
        
        this.cropper = new Cropper(img, {
            aspectRatio: this.options.aspectRatio,
            viewMode: this.options.viewMode,
            dragMode: this.options.dragMode,
            cropBoxResizable: this.options.cropBoxResizable,
            preview: '#cropperPreview',
            background: false,
            ready: () => {
                URL.revokeObjectURL(url);
            }
        });
        
        return new Promise((resolve, reject) => {
            this.resolvePromise = resolve;
            this.rejectPromise = reject;
        });
    }
    
    hide(reason) {
        if (this.cropper) {
            this.cropper.destroy();
            this.cropper = null;
        }
        this.modal.style.display = 'none';
        if (this.rejectPromise) {
            this.rejectPromise(reason || 'cancelled');
            this.rejectPromise = null;
        }
        this.resolvePromise = null;
    }
    
    confirm() {
        if (!this.cropper) return;
        
        this.cropper.getCroppedCanvas().toBlob((blob) => {
            const croppedFile = new File([blob], 'cropped.jpg', {
                type: 'image/jpeg',
                lastModified: Date.now()
            });
            if (this.resolvePromise) {
                this.resolvePromise(croppedFile);
                this.resolvePromise = null;
            }
            this.hide('confirmed');
        }, 'image/jpeg', 0.9);
    }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageCropper;
}