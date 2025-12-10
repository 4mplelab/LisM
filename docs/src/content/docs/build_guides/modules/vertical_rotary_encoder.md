---
title: 垂直ロータリーエンコーダーモジュール　ビルドガイド
---

1Uサイズの`垂直ロータリーエンコーダー`モジュールのビルドガイドです。  
ロータリーエンコーダーは5pin（プッシュスイッチ）に対応していますが、同梱しているエンコーダーは3pinです。

## 内容物
![部品](img/venc01.jpg)

| 部品名 | 数量 | 備考 |
| :--- | :--- | :--- |
| 基板 | 1 | |
| エンコーダー | 1 | EC12E2440301 |
| ネジ | 2 | M2 x 6mm |
| マグネット | 2 | 3mm x 1mm |

## ケース
![ケース](img/venc02.jpg)

:::note[ケースをご自身で用意される方は]
[ケースデータ](https://github.com/4mplelab/LisM/tree/main/3d-data/case/modules)の`VerticalRotaryEncoder.step`を参照ください。
:::

| 部品名 | モデル名 | 備考 |
| :--- | :--- | :--- |
| ノブ | Knob | |
| トップケース | TopPart | |
| ボトムケース | BottomPart | |

---

## 必要な工具

*   はんだごて
*   はんだ
*   ドライバー (+)
*   ニッパー

---

## 組み立て手順
### 1. はんだ付け

<details class="details-card">
    <summary>エンコーダーの回転をスムーズにしたい方</summary>
    以下のポストのように部品を外すと力を入れずに回すことができるようになります。  
    <blockquote class="twitter-tweet">
        <p lang="ja" dir="ltr">ロータリーエンコーダーが回すのに結構トルク必要だったけど中の部品一つ外したらめっちゃ快適になった <a href="https://t.co/ILao7Msenr">pic.twitter.com/ILao7Msenr</a></p>&mdash; shakupan (@shakupan_) <a href="https://twitter.com/shakupan_/status/1856025469663228051?ref_src=twsrc%5Etfw">November 11, 2024</a>
    </blockquote>
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</details>


1. エンコーダーを基板に挿入し、はんだ付けを行ってください。  
    ![はんだ付け](img/venc-build01-01.jpeg)
   
2. 画像の赤丸の足は、ケースやFFCを通す時に干渉するため、切断してください。  
   (切断してからはんだ付けでもOKですが、切り過ぎにはご注意ください)
    ![cut](img/venc-build01-02.jpg)

    :::note[(推奨)FFCを保護するため、FFCが通る部分をテープ等で覆ってください。]
    ![保護](img/venc-build01-03.jpeg)
    :::

### 2. ボトムケースへマグネット取り付け
1. 底面(手前側)2カ所へマグネットを取り付けてください。

    :::caution[本体のマグネットの極性に合わせる必要があります]
    :::

    ![mag](img/venc-build02-01.jpeg)

### 3. ケース組み立て
1. ネジ穴を合わせ、トップケースの中に基板を入れてください。
    ![case](img/venc-build03-01.jpeg)
   
2. ボトムケースの(奥側の)ネジ穴を合わせ、M2ネジで固定してください。(締め過ぎ注意)  
    ![case](img/venc-build03-02.jpeg)
   
3. ノブの向きを合わせながらエンコーダーに取り付けて完成です。  
    ![knob](img/venc-build03-03.jpeg)

## 本体との接続時の注意事項
FFCはモジュールの奥側からケース内を通してコネクタと接続してください。  
![ffc](img/venc03.jpeg)

---

## 本体への取り付け
組み立てたモジュールは、[モジュール付け替えの手順](../../../how2#モジュール付け替え)を参考に本体に取り付けてください。