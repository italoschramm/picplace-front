<template>
    <div class="stepsdemo-content">
        <Card>
            <template v-slot:title>
                Detalhes do imóvel
            </template>
            <template v-slot:subtitle>
                Informe os detalhes do imóvel
            </template>

            <Toast />
            <template v-slot:content>
                <div class="field">
                <FileUpload name="demo[]" url="https://www.primefaces.org/upload.php" @upload="upload($event)" @removeUploadedFile="removeUploadedFile($event)" :multiple="true" accept="image/*" :maxFileSize="1000000">
                    <template #content>
                        <ul v-if="uploadedFiles && uploadedFiles[0]">
                            <li v-for="file of uploadedFiles[0]" :key="file">{{ file.name }} - {{ file.size }} bytes</li>
                        </ul>
                    </template>
                    <template #empty>
                        <p>Arraste e solte os arquivo aqui para fazer o upload.</p>
                    </template>
                    </FileUpload>
                    <small v-show="validationErrors.files && submitted" class="p-error">É necessário postar no mínimo 1 foto</small>
                </div>
            </template>

            <template v-slot:footer>
                <div class="grid grid-nogutter justify-content-between">
                    <i></i>
                    <Button label="Next" @click="nextPage()" icon="pi pi-angle-right" iconPos="right" />
                </div>
            </template>
    </Card>
    </div>
</template>

<script>
import httpIbge from '@/api/api-ibge.js';
import http from '@/api/back-api.js';

export default {
    data () {
        return {
            imageBase64: '',
            uploadedFiles: [],
            files: [],
            pictures: [],
            totalSize: 0,
            totalSizePercent: 0,
            submitted: false,
            validationErrors: {}
        }
    },
    props: {
        formData: Object
    },
    created(){
      console.log(this.formData)  
    },
    methods: {
        onRemoveTemplatingFile(file, onFileRemove, index) {
            onFileRemove(index);
            this.totalSize -= parseInt(this.formatSize(file.size));
            this.totalSizePercent = this.totalSize / 10;
        },
        onClearTemplatingUpload(clear) {
            clear();
            this.totalSize = 0;
            this.totalSizePercent = 0;
        },
        onSelectedFiles(event) {
            this.files = event.files;
            this.files.forEach((file) => {
                this.totalSize += parseInt(this.formatSize(file.size));
            });
            
        },
        upload(event) {
            this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
            this.files = event.files;
            this.convertImages(0);
        },
        convertImages(index){
            let p = Promise.resolve();
            p = p.then(async () => this.loadImage(this.files[index]).then(result => {
                this.files[index] = this.resizeImage2(result);
                if(this.files.length > index + 1)
                    this.convertImages(index + 1)
            })).catch(e => {
                console.log(e);
            });
        },
        loadImage: function(file){
            let image = new Image();
            return new Promise((resolve, reject) => {
                image.src = file.objectURL 
                image.onload = () => resolve(image);
                image.onerror = () => reject(image);
            });
        },
        resizeImage2: function(img) {
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            var width = 680;
            var height = 430;

            canvas.height=height;
            canvas.width=width;
            context.drawImage(img, 0, 0, width, height);

            //var x = (context.canvas.width - img.width * width) / 2;
            //var y = (context.canvas.height - img.height * height) / 2;
            //context.drawImage(img, x, y, img.width * width, img.height * height); 

            return canvas.toDataURL('image/jpeg', 0.85).split(',')[1];
        },
        resizeImage: function(img){
            var width = 680;
            var height = 430;
            let outputCanvas = document.createElement('canvas');
            let outputCanvasContext = outputCanvas.getContext("2d");

                // Make sure the width and height preserve the original aspect ratio and adjust if needed
                if(img.height > img.width) {
                    width = Math.floor(height * (img.width / img.height));
                }else {
                    height = Math.floor(width * (img.height / img.width));
                }

                let resizingCanvas = document.createElement('canvas');
                let resizingCanvasContext = resizingCanvas.getContext("2d");

                // Start with original image size
                resizingCanvas.width = img.width;
                resizingCanvas.height = img.height;


                // Draw the original image on the (temp) resizing canvas
                resizingCanvasContext.drawImage(img, 0, 0, resizingCanvas.width, resizingCanvas.height);

                let curImageDimensions = {
                    width: Math.floor(img.width),
                    height: Math.floor(img.height)
                };

                let halfImageDimensions = {
                    width: null,
                    height: null
                };

                // Quickly reduce the dize by 50% each time in few iterations until the size is less then
                // 2x time the target size - the motivation for it, is to reduce the aliasing that would have been
                // created with direct reduction of very big image to small image
                while (curImageDimensions.width * 0.5 > width) {
                    // Reduce the resizing canvas by half and refresh the image
                    halfImageDimensions.width = Math.floor(curImageDimensions.width * 0.5);
                    halfImageDimensions.height = Math.floor(curImageDimensions.height * 0.5);

                    resizingCanvasContext.drawImage(resizingCanvas, 0, 0, curImageDimensions.width, curImageDimensions.height,
                        0, 0, halfImageDimensions.width, halfImageDimensions.height);

                    curImageDimensions.width = halfImageDimensions.width;
                    curImageDimensions.height = halfImageDimensions.height;
                }

                // Now do final resize for the resizingCanvas to meet the dimension requirments
                // directly to the output canvas, that will output the final image

                outputCanvas.width = width;
                outputCanvas.height = height;

                outputCanvasContext.drawImage(resizingCanvas, 0, 0, curImageDimensions.width, curImageDimensions.height,
                    0, 0, width, height);

                // output the canvas pixels as an image. params: format, quality
                return outputCanvas.toDataURL('image/jpeg', 0.85).split(',')[1];

                // TODO: Call method to do something with the resize image
        },
        removeUploadedFile(event){
            for (var i = this.files.length - 1; i >= 0; --i) {
                if (this.files[i].objectURL == event.file.objectURL) {
                    this.files.splice(i,1);
                    return;
                }
            } 
            
        },
        uploadEvent(callback) {
            this.totalSizePercent = 100;
            callback();
        },
        onTemplatedUpload() {
            this.totalSize = 0;
            this.totalSizePercent = 0;
            this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
        },
        onUpload() {
            this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
        },
        formatSize(bytes) {
            if (bytes === 0) {
                return '0 B';
            }

            let k = 1000,
                dm = 3,
                sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
                i = Math.floor(Math.log(bytes) / Math.log(k));

            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        },
        nextPage() {
            this.submitted = true;
            if (this.validateForm() ) {
                this.$emit('next-page', {formData: {zipcode: this.formData.zipcode, address: this.formData.address, number: this.formData.number, complement: this.formData.complement,
                                                    district: this.formData.district, state: this.formData.state, city: this.formData.city, bedrooms: this.formData.bedrooms,
                                                    suites: this.formData.suites, parkingSpaces: this.formData.parkingSpaces, usableArea: this.formData.usableArea, totalArea: this.formData.totalArea,
                                                    description: this.formData.description, idTransactionType: this.formData.idTransactionType, idPropertyType: this.formData.idPropertyType,
                                                    idPropertyTypeCategory: this.formData.idPropertyTypeCategory, price: this.formData.price, condominiumFEE: this.condominiumFEE, files: this.files, active: true
                                                    }, pageIndex: 2});
            }
        },
        validateForm() {
            if (this.files.length == 0)
                this.validationErrors['files'] = true;
            else
                delete this.validationErrors['files'];

            return !Object.keys(this.validationErrors).length;
        }
    }
}
</script>

<style lang="scss" scoped>
    ::v-deep(.custom-progress-bar) {
        .p-progressbar-value {
            background-color: #f44336;
        }
    }
</style>