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
                <FileUpload name="demo[]" url="https://www.primefaces.org/upload.php"  @upload="onAdvancedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000">
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
            uploadedFiles: [],
            files: [],
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
            console.log('files: ' + event.files)
            console.log('files: ' + event.uploadedFiles)
            this.files = event.files;
            this.files.forEach((file) => {
                this.totalSize += parseInt(this.formatSize(file.size));
            });
            
        },
        onAdvancedUpload(event) {
            this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
            this.files = event.files;
            console.log(this.files)
        },
        uploaderEvent(event){
            console.log('Aqui ok')
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
                this.$emit('next-page', {formData: {zip: this.formData.zip, address: this.formData.address, number: this.formData.number, complement: this.formData.complement,
                                                    district: this.formData.district, state: this.formData.state, city: this.formData.city, bedrooms: this.formData.bedrooms,
                                                    suites: this.formData.suites, parkingSpaces: this.formData.parkingSpaces, usableArea: this.formData.usableArea, totalArea: this.formData.totalArea,
                                                    description: this.formData.description, transaction: this.formData.transaction, propertyType: this.formData.propertyType,
                                                    category: this.formData.category, price: this.formData.price, pictures: this.formData.files, active: true
                                                    }, pageIndex: 2});
            }
        },
        validateForm() {
            if (!this.files.length > 0)
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