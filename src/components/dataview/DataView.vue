<template>
	<div class="filter">
		<Filter @filter="filterProp"/>
	</div>
    <div class="card">
        <DataView :value="properties" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
			<template #header>
                <div class="grid grid-nogutter">
                    <div class="col-6" style="text-align: left">
                        <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)"/>
                    </div>
                    <div class="col-6" style="text-align: right">
                        <DataViewLayoutOptions v-model="layout" />
                    </div>
                </div>
			</template>

			<template #list="slotProps">
				<div class="col-12">
					<div class="product-list-item">
						<img :src="slotProps.data.pictures[0].code" :alt="slotProps.data.name" width="100" height="50"/>
						<div class="product-list-detail">
							<span :class="'product-badge status-'">{{slotProps.data.city}} - {{slotProps.data.state}}</span>
							<!-- <div class="product-name">{{slotProps.data.name}}</div> -->
							<div class="product-name">{{slotProps.data.district}}</div>
							<!-- <div class="product-description">{{slotProps.data.description}}</div> -->
							<div class="product-description">Dormitórios: {{slotProps.data.bedrooms}} - Área Total: {{slotProps.data.totalArea}}m²</div>
							<!-- <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false"></Rating> -->
							<div class="product-category">{{slotProps.data.transactionType.description}}</div>
						</div>
						<div class="product-list-action">
							<!-- <span class="product-price">${{slotProps.data.salePrice}}</span>
							<Button icon="pi pi-shopping-cart" label="Add to Cart" :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"></Button>
							<span :class="'product-badge status-'+slotProps.data.inventoryStatus.toLowerCase()">{{slotProps.data.inventoryStatus}}</span> -->
						</div>
					</div>
				</div>
			</template>

			<template #grid="slotProps">
				<div class="col-12 md:col-4">
					<div class="product-grid-item card">
						<div class="product-grid-item-top">
							<div>
								<div class="product-category">{{slotProps.data.transactionType.description}}</div>
								<!-- <i class="pi pi-tag product-category-icon"></i>
								<span class="product-category">Teste</span> -->
							</div>
							<!-- <span :class="'product-badge status-'+slotProps.data.description.toLowerCase()">{{slotProps.data.inventoryStatus}}</span> -->
							<span :class="'product-badge status-'">{{slotProps.data.city}} - {{slotProps.data.state}}</span>
						</div>
						<div class="product-grid-item-content">
							<img @click="goDetails(slotProps.data.id)" :src="slotProps.data.pictures[0].code" :alt="slotProps.data.name" width="350" height="300"/>
							<!-- <div class="product-name">{{slotProps.data.name}}</div> -->
							<div class="product-name">{{slotProps.data.district}}</div>
							<!-- <div class="product-description">{{slotProps.data.description}}</div> -->
							<div class="product-description">Dormitórios: {{slotProps.data.bedrooms}} - Área Total: {{slotProps.data.totalArea}}m²</div>
							<!-- <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false"></Rating> -->
						</div>
						<div class="product-grid-item-bottom">
							<span class="product-price">{{this.formatAsCurrency(slotProps.data.price)}}</span>
							<Button @click="goDetails(slotProps.data.id)" icon="pi pi-envelope" :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"></Button>
						</div>
					</div>
				</div>
			</template>
		</DataView>
	</div>
</template>

<script>
import Api from '../../api/back-api'
import Router from '@/router/index.ts'
import PropView from '@/views/Propview.vue'
import Filter from '@/components/filter/Filter.vue';

export default {
    data() {
        return {
            properties: null,
			property: null,
            layout: 'grid',
            sortKey: null,
            sortOrder: null,
            sortField: null,
            sortOptions: [
                {label: 'Price High to Low', value: '!price'},
                {label: 'Price Low to High', value: 'price'},
            ]
        }
    },
	components: {
		PropView,
		Filter
	},
    productService: null,
    mounted() {
		Api.getAllProperties().then(response  => {
			this.properties = response.data
			});
		console.log(this.properties);
    },
    methods: {
        onSortChange(event){
			console.log(this.formatAsCurrency(10351));
            const value = event.value.value;
            const sortValue = event.value;

            if (value.indexOf('!') === 0) {
                this.sortOrder = -1;
                this.sortField = value.substring(1, value.length);
                this.sortKey = sortValue;
            }
            else {
                this.sortOrder = 1;
                this.sortField = value;
                this.sortKey = sortValue;
            }
        },
		formatAsCurrency:  function(value) {
			var number = parseFloat(value).toLocaleString('pt-BR',{ style: 'currency', currency: 'BRL' });
  			return number;
		},
		goDetails(id){
			//console.log(this.property)
			this.$router.push({name: 'prop', params: {idProperty: id}})
		},
		filterProp(value){
			this.properties = value
		}
    }
}
</script>

<style lang="scss" scoped>
.filter{
    margin-top: 30px;
    height: 100%;
    width: 100%;
    align-content: center;
    justify-content: center;
    display: flex;
}
.card {
    background: #ffffff;
    padding: 2rem;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
    border-radius: 4px;
    margin-bottom: 2rem;
}
.p-dropdown {
    width: 14rem;
    font-weight: normal;
}

.product-name {
	font-size: 1.5rem;
	font-weight: 700;
}

.product-description {
	margin: 0 0 1rem 0;
}

.product-category-icon {
	vertical-align: middle;
	margin-right: .5rem;
}

.product-category {
	font-weight: 600;
	vertical-align: middle;
}

::v-deep(.product-list-item) {
	display: flex;
	align-items: center;
	padding: 1rem;
	width: 100%;

	img {
		width: 50px;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin-right: 2rem;
	}

	.product-list-detail {
		flex: 1 1 0;
	}

	.p-rating {
		margin: 0 0 .5rem 0;
	}

	.product-price {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: .5rem;
		align-self: flex-end;
	}

	.product-list-action {
		display: flex;
		flex-direction: column;
	}

	.p-button {
		margin-bottom: .5rem;
	}
}

::v-deep(.product-grid-item) {
	margin: .5rem;
	border: 1px solid var(--surface-border);

	.product-grid-item-top,
	.product-grid-item-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	img {
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin: 2rem 0;
	}

	.product-grid-item-content {
		text-align: center;
	}

	.product-price {
		font-size: 1.5rem;
		font-weight: 600;
	}
}

@media screen and (max-width: 576px) {
	.product-list-item {
		flex-direction: column;
		align-items: center;

		img {
			margin: 2rem 0;
		}

		.product-list-detail {
			text-align: center;
		}

		.product-price {
			align-self: center;
		}

		.product-list-action {
			display: flex;
			flex-direction: column;
		}

		.product-list-action {
			margin-top: 2rem;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
		}
	}
}
</style>