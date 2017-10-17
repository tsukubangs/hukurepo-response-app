<template>
  <v-ons-page>
    <div id="agreement" class="blueOutline">
        <v-ons-checkbox
          :value="0"
          v-model="checkOn"
        >
        </v-ons-checkbox>
        <b>以下のプリバシーポリシーに同意の上アカウントを作成する</b>

        <div id="button" style="margin-bottom:10%">
          <ons-button style="margin-right: 10%;" modifier="light" @click="toInit()">いいえ</ons-button>
          <ons-button input-id="nextButton" :disabled="!checkOn" modifier="cta" @click="toSignUp()">は　い</ons-button>
        </div>

        <div class="small_text">
        <h1>プライバシーポリシー</h1>
        <p>筑波大学北川・天笠データ工学研究室（http://www.kde.cs.tsukuba.ac.jp/）
        （以下「本アプリケーション提供者」）は，「ふくレポ」（以下「本アプリ
        ケーション」）利用者のプライバシー保護に配慮し，以下のとおりプライバ
        シーポリシーを規定します．</p>
        <h2>第1条（基本方針）</h2>
        本アプリケーション提供者は，本アプリケーションを利用される皆様のプライ
        バシーを尊重し，安心してご利用いただけるよう努めます．収集したデータに
        ついては，関連する法令およびその他の規範を遵守し，適正な取り扱いを行い
        ます．
        <h2>第2条（収集情報の範囲）</h2>
        本アプリケーションでは，参加型センシングに参加される場合皆様に，困りご
        とに関する情報（写真，テキスト，選択式のタグ等）をご提供いただきます．
        <h2>第3条（利用目的）</h2>
        <p>収集した情報は，学術研究のためにのみ使用し，それ以外の目的には使用しま
        せん．収集した情報に個人情報が含まれる場合は，個人が特定できない形に加
        工した上で，研究の目的に必要な部分に限って使用します．また，個人が特定
        できない形に加工したデータは，同一研究プロジェクト内の別の団体
        （Commissariat á l‘énergie atomique et aux energies alternatives -
        Laboratoire d’électronique des technologies de
        l‘information（CEA-Leti）（フランス）、Engineering Ingegneria
        Informatica SpA（イタリア）、ABSISKEY Collaborative Project（フラン
        ス）、School of Computing and Communications, Lancaster University（イ
        ギリス）、Institute of Communication and Computer System, National
        Technical University of Athens（ギリシャ）、Grenoble市（フランス）、
        Bristol市（イギリス）、東日本電信電話株式会社、学校法人　慶應義塾大学
        SFC研究所、大学共同利用機関法人情報・システム研究機構 国立情報学研究
        所、日本電信電話株式会社（未来ねっと研究所），茨城県つくば市，神奈川県
        藤沢市）に提供される場合があります．
        第4条（個人情報の利用および提供）
        収集した個人情報は，あらかじめ明示した利用目的の範囲内で利用し，利用者
        本人の承諾を得ている場合，あるいは法令または条例の定めがある場合等を除
        き，目的以外の利用及び第三者への提供は行いません．なお，本アプリケー
        ション提供者は，研究を目的とした範囲内で，それらの情報を自由に選択，修
        正，編集，削除し，統計的に処理した上で，本人の承諾なしに，開示・公表す
        ることがあります．</p>
        <h2>第5条（個人情報の管理）</h2>
        <p>収集した個人情報は，本アプリケーション提供者が厳重に管理し，漏えい，滅
        失，改ざん等の防止措置を講じます．個人情報は，研究プロジェクト（高度通
        信・放送研究開発委託研究（NICT）「欧州との連携による公共ビッグデータの
        利活用基盤に関する研究開発事業」BigClouTプロジェクト）終了の1年後
        （2020年6月30日）をもって本アプリケーション提供者が責任を持って削除し
        ます．</p>
        <h2>第6条（個人情報の開示）</h2>
        <p>収集した個人情報は，本人または本人が指定する代理人からの求めに応じて開
        示します．</p>
        <h2>第7条（プライバシーポリシーの変更）</h2>
        <p>本プライバシーポリシーの内容を変更する場合は，アプリケーション内でその
        内容を事前に掲載し，利用者に個別の連絡はいたしません．
        第8条（個人情報に関する問合せ）
        個人情報およびその取扱い，削除に関するお問合せは，
        <a href="mailto:bigclout@kde.cs.tsukuba.ac.jp">bigclout@kde.cs.tsukuba.ac.jp</a>までご連絡下さい</p>
        （最終更新日：2017年10月16日）<br />
      </div>

  </div>

  </v-ons-page>
</template>

<script>
import router from '../router';
import CustomToolbar from './CustomToolbar';

export default {
  name: 'agree-page',
  components: {
    CustomToolbar,
  },
  data() {
    return {
      checkOn: false,
    };
  },
  methods: {
    toSignUp() {
      router.push('sign-up');
    },
    toInit() {
      router.push('init');
    },
  },
};
</script>

<style scoped>

#button {
text-align:center;
margin: 10px;
}

#agreement {
  margin: 5%;
  padding: 5%;
}

ons-dialog:not([modifier='material']) p {
  margin-left: 10px;
  margin-right: 10px;
}

input {
  width: 100%;
}

div.button {
text-align:center;
}
div.button input {
margin: 0px 20px;
}


.button--outline {
  background-color: white;
  color: #2bb46e;
}

.blueOutline {
  /*color: #2bb46e;*/
  border: solid 1px #2bb46e;
}

div.small_text{
  font-size: x-small;
  margin-bottom: 10px;
}
h2 {
  font-size: medium;
}
h1 {
  font-size: large
}

</style>
