<template>
  <section>
    <template v-if="!currentProduct">
      <p class="error-block">Продукт не знайдено(</p>
    </template>
    <template v-else>
      <div class="product container">
        <h1 class="product__title">{{ currentProduct.title }}</h1>

        <div class="product__short-description">
          <div class="desc-item img-block">
            <img :src="currentProduct.img" alt="">
          </div>
          <div class="desc-item desc-block">
            <div class="price-block help-block">
              <p class="price">{{ currentProduct.price }} грн/кг</p>
              <p @click="buyAction" class="buy-btn">Купити</p>
            </div>
            <div class="shipping-info help-block">
              <h2>Доставка</h2>
              <p class="mb-1">Доставимо по всій Україні Новою поштою</p>
              <p>Відправимо вже сьогодні!</p>
            </div>
            <div class="pay-info help-block">
              <h2>Оплата</h2>
              <p>Готівкова, Google Pay, Онлайн карткою, Оплата через Masterpass, Безготівковими для юридичних осіб,
                Безготівковими для фізичних осіб</p>
            </div>
          </div>
        </div>
        <div class="product__full-description">
          <h2 class="title">Опис</h2>
          <p v-for="(item, i) in currentProduct.fullDescription" :key="i" class="description-part">{{ item }}</p>
          <p v-if="currentProduct.harvest"><span class="title-section">Врожайність: </span> {{ currentProduct.harvest }}
          </p>
          <div class="seed-wrapper">
            <p class="title-section mt-12">Норма висіву(1 га/ 1 сотка):</p>
            <ul>
              <li v-for="(item, i) in currentProduct.seed" :key="i" class="seed-item">- {{ item }}</li>
            </ul>
          </div>

        </div>

        <div class="more-products">
          <h2 class="more-products__title">Також вас можуть зацікавити</h2>
          <client-only>
            <swiper class="swiper" :options="swiperOption">
              <swiper-slide class="slider-item" v-for="(item, i) in moreProducts" :key="i">
                <div class="img-wrapper" @click="changeProduct(item.id)">
                  <img :src="item.img" alt="" class="slider-img">
                </div>
                <h3 class="slider-item__title" :title="item.title">{{ cutTitleForMobile(item.title) }}</h3>
                <h2 class="price-slider">{{ item.price }} грн/кг</h2>
                <div class="btn-wrapper">
                  <p class="btn btn-more" @click="changeProduct(item.id)">Детальніше</p>
                  <p class="btn btn-buy" @click="buyAction(item.id, true)">Купити</p>
                </div>
              </swiper-slide>
            </swiper>
          </client-only>
        </div>
      </div>
    </template>

  </section>
</template>

<script>
// import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
// import 'swiper/css/swiper.css'

import {mapGetters, mapMutations} from "vuex";

export default {
  name: "ProductPage",
  props: ['id'],
  // components: {
  //   Swiper,
  //   SwiperSlide
  // },
  data() {
    return {
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 10,

        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 10
          }
        }
      },
      currentProductId: ''
    }
  },
  created() {
    this.currentProductId = this.$route.params.id
  },
  mounted() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  },
  computed: {
    ...mapGetters('itemsForShop', ['getShopItems', 'getProductById']),
    currentProduct() {
      const Id = this.currentProductId
      return this.getProductById(Id)
    },
    moreProducts() {
      return this.getShopItems
    }
  },
  methods: {
    ...mapMutations('basket', ['addEllToBasket']),
    buyAction(id, fromSlider = false) {
      let basketItem
      if (fromSlider) {
        basketItem = {...this.moreProducts.find(c => c.id === id)}
      } else {
        basketItem = {...this.currentProduct}
      }

      this.addEllToBasket(basketItem)
      // this.$gtag.event('click-buy-button', {
      //   'event_category': 'add-product-to-basket',
      //   'event_label': '+ product',
      //   'value': basketItem
      // })
      this.$router.push('/basket')
    },
    changeProduct(id) {
      console.log('sdv')
      this.currentProductId = id
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    },
    cutTitleForMobile(text) {
      if (text.length > 17) {
        text = text.substr(0, 17) + '...'
      }
      return text
    },
  }
}
</script>

<style scoped lang="scss">

.error-block {
  padding-top: 40px;
  text-align: center;
  font-size: 25px;
  color: #22283D;
  font-weight: bold;
}

.mb-1 {
  margin-bottom: 10px;
}

.mt-12 {
  margin-top: 12px;
}

.container {
  font-family: Arial, Segoe UI, Roboto, Helvetica, sans-serif;
  max-width: 1170px;
  padding: 20px 15px;
  margin: 0 auto;
}

.product {
  color: #22283D;

  &__title {
    font-size: 32px;
    line-height: 43px;
    color: #22283D;
    margin-bottom: 15px;
  }

  &__short-description {
    display: grid;
    grid-template-columns: 5fr 4fr;

    .img-block {
      margin-bottom: 20px;

      img {
        width: 90%;
      }
    }

    .desc-block {


      .help-block {
        margin-bottom: 24px;
        border: 1px solid #e9e9e9;
        border-radius: 4px;
        padding-bottom: 16px;

        h2 {
          border-bottom: 1px solid #e9e9e9;
          padding: 10px 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        p {
          padding: 0 16px;
        }
      }

      .price-block {
        display: flex;
        padding-top: 16px;

        .price {
          font-size: 32px;
        }

        .buy-btn {
          color: #ffffff;
          background-color: #3bb78f;
          background-image: linear-gradient(315deg, #3bb78f 0%, #0bab64 74%);
          padding: 10px 15px;
          cursor: pointer;
          border-radius: 2px;
          margin-left: 12px;
        }
      }

    }
  }

  &__full-description {
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    padding: 16px;
    color: #333;
    font-size: 14px;

    .title {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 20px;
    }

    .description-part {
      margin-bottom: 12px;
      font-style: italic;
    }

    .title-section {
      font-weight: bold;
    }


    .seed-item {
      padding-left: 20px;
      padding-top: 3px;
    }
  }
}

.more-products {
  margin-top: 20px;

  &__title {
    color: #22283D;
    font-size: 22px;
  }
}

.swiper {
  margin-top: 5px;
  height: 270px;
  padding: 10px;
}

.slider-item {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  &__title {
    font-size: 13px;
    text-align: center;
    margin-top: 5px;
  }

  .btn-wrapper {
    display: flex;
    justify-content: space-around;

    .btn {
      padding: 10px;
      cursor: pointer;
      margin-bottom: 15px;
      border-radius: 2px;
      font-size: 13px;
      margin-top: 13px;
    }

    .btn-more {
      background: rgba(0, 0, 0, 0.03);

      &:hover {
        background: rgba(0, 0, 0, 0.07);
      }
    }

    .btn-buy {
      color: #ffffff;
      background-color: #3bb78f;
      background-image: linear-gradient(315deg, #3bb78f 0%, #0bab64 74%);
      padding: 10px 15px;
    }

  }

  .price-slider {
    padding-top: 5px;
    text-align: center;
  }
}

.img-wrapper {
  cursor: pointer;

  .slider-img {
    width: 100%;
    height: 150px;
  }
}


@media all and (max-width: 599px) {
  .product {
    &__title {
      font-size: 22px;
      font-weight: 600;
    }

    &__short-description {
      grid-template-columns: 1fr;

      .img-block {
        img {
          width: 100%;
        }

      }
    }
  }

  .btn-wrapper {

    .btn {
      padding: 7px;
      cursor: pointer;
      margin-bottom: 15px;
      border-radius: 2px;
      font-size: 13px;
      margin-top: 13px;
    }

    .btn-more {
      padding: 10px 6px !important;

    }

    .btn-buy {
      padding: 10px 9px !important;
    }
  }
}


</style>
