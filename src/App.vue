<template>
  <main>
    <table>
      <tr class="top">
        <th class="left-top top-cell cell">
          Старт
          <div class="chip1"></div>
          <div class="chip2"></div>
        </th>
        <th class="top-cell cell">
          <div class="cell-family-1"></div>
          <p>кафе</p>
          <p class="costCoffe">20р</p>
        </th>
        <th class="top-cell cell">
          <div class="cell-family-1"></div>
          <p>бар</p>
          <div class="costBar">20р</div>
        </th>
        <th class="top-cell cell">пропуск хода</th>
        <th class="top-cell cell">
          <div class="cell-family-1"></div>
          <p>ресторан</p>
          <div class="costRestoran">30р</div>
        </th>
        <th class="top-cell cell">налог 10%</th>
        <th class="top-cell cell">
          <div class="cell-family-2"></div>
          <p>ЖД перевозки</p>
          <div class="costTrain">50р</div>
        </th>
        <th class="top-cell cell">
          <div class="cell-family-3"></div>
          <p>рекламное агенство</p>
          <div class="costAddvert">40р</div>
        </th>
        <th class="top-cell cell">лотерея</th>
        <th class="top-cell cell">
          <div class="cell-family-3"></div>
          <p>модельное агенство</p>
          <div class="costModel">40р</div>
        </th>
        <th class="top-cell cell">
          <div class="cell-family-3"></div>
          <p>тур-<br />агенство</p>
          <div class="costTravel">40р</div>
        </th>
        <th class="right-top top-cell cell">Тюрьма</th>
      </tr>
      <tr>
        <th class="left-cell cell">
          <div class="cell-family-10"></div>
          <p>алмазы</p>
          <div class="costBriliants">200р</div>
        </th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th class="right-cell cell">
          <div class="cell-family-4"></div>
          <p>табачная фабрика</p>
          <div class="costTabaco">50р</div>
        </th>
      </tr>
      <tr>
        <th class="left-cell cell">
          <div class="cell-family-10"></div>
          <p>Золото</p>
          <div class="costGold">150р</div>
        </th>
        <th></th>
        <th>Игрок №1</th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th>Игрок №2</th>
        <th></th>
        <th class="right-cell cell">
          <div class="cell-family-4"></div>
          <p>ликеро-водочный<br />завод</p>
          <div class="costVodka">50р</div>
        </th>
      </tr>
      <tr>
        <th class="left-cell cell">налог 20%</th>
        <th></th>
        <th class="cash1">На Счете: 500р</th>
        <th></th>
        <th class="cube">
          <div class="cube__inner">
            <p>0</p>
          </div>
        </th>
        <th class="cube">
          <div class="cube__inner">
            <p>0</p>
          </div>
        </th>
        <th>
          <button class="btnCube">
            <p>Бросить кубик</p>
          </button>
        </th>
        <th></th>
        <th></th>
        <th class="cash2">На Счете: 500р</th>
        <th></th>
        <th class="right-cell cell">
          <div class="cell-family-5"></div>
          <p>ночной клуб</p>
          <div class="costClub">60р</div>
        </th>
      </tr>
      <tr>
        <th class="left-cell cell">
          <div class="cell-family-9"></div>
          <p>багамские острова</p>
          <div class="costBahams">110р</div>
        </th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th class="right-cell cell">лотерея</th>
      </tr>
      <tr>
        <th class="left-cell cell">
          <div class="cell-family-9"></div>
          <p>карибские острова</p>
          <div class="costCaribean">100р</div>
        </th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th class="right-cell cell">
          <div class="cell-family-5"></div>
          <p>казино</p>
          <div class="costCazino">60р</div>
        </th>
      </tr>
      <tr class="bottom">
        <th class="left-bottom bottom-cell cell">Отдых</th>
        <th class="bottom-cell cell">
          <div class="cell-family-7"></div>
          <p>добыча нефти</p>
          <div class="costOil">90р</div>
        </th>
        <th class="bottom-cell cell">
          <div class="cell-family-7"></div>
          <p>добыча газа</p>
          <div class="costGaz">90р</div>
        </th>
        <th class="bottom-cell cell">
          <div class="cell-family-8"></div>
          <p>авто<wbr />стоение</p>
          <div class="costAutoBild">80р</div>
        </th>
        <th class="bottom-cell cell">
          <div class="cell-family-8"></div>
          <p>авиа<wbr />строение</p>
          <div class="costAviaBild">80р</div>
        </th>
        <th class="bottom-cell cell">пропуск хода</th>
        <th class="bottom-cell cell">
          <div class="cell-family-2"></div>
          <p>Авиапер<wbr />евозки</p>
          <div class="costAvia">50р</div>
        </th>
        <th class="bottom-cell cell">
          <div class="cell-family-6"></div>
          <p>фут<wbr />больный клуб</p>
          <div class="costFootbal">70р</div>
        </th>
        <th class="bottom-cell cell">налог 10%</th>
        <th class="bottom-cell cell">
          <div class="cell-family-6"></div>
          <p>баскет<wbr />больный клуб</p>
          <div class="costBascetball">70р</div>
        </th>
        <th class="bottom-cell cell">
          <div class="cell-family-6"></div>
          <p>хоккейный клуб</p>
          <div class="costHokey">70р</div>
        </th>
        <th class="right-bottom bottom-cell cell">Джек Пот</th>
      </tr>
    </table>
  </main>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/index";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
