/*テキストを含む一般的なモーダル*/
$(".btn-view2").modaal({
	overlay_close: true,
	before_open: function () {
		$('html').css('overflow-y', 'hidden');/*縦スクロールバーを出さない*/
		$.scrollify.disable();//scrollfyのプラグインを無効に
	},
	after_close: function () {
		$('html').css('overflow-y', 'scroll');/*縦スクロールバーを出す*/
		$.scrollify.enable();//scrollfyのプラグインを有効に
	}
});

/*画像をクリックしたら現れる画面の設定*/
$(".btn-view").modaal({
	fullscreen: 'true', //フルスクリーンモードにする
	before_open: function () {
		$('html').css('overflow-y', 'hidden');
		$.scrollify.disable();
	},
	after_close: function () {
		$('html').css('overflow-y', 'scroll');
		$.scrollify.enable();
	}
});


/* スクロールすると1画面移動 */
$.scrollify({
	section: ".box",//1ページスクロールさせたいエリアクラス名
	scrollbars: "false",//スクロールバーは非表示
	interstitialSection: "#header",
	easing: "swing",
	scrollSpeed: 800, // 速度

	/*ページネーション設定*/
	before: function (i, panels) {
		var ref = panels[i].attr("data-section-name");
		$(".pagination .active").removeClass("active");
		$(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
	},
	afterRender: function () {
		var pagination = "<ul class=\"pagination\">";
		var activeClass = "";
		$(".box").each(function (i) {/*1ページスクロールさせたいエリアクラス名を指定*/
			activeClass = "";
			if (i === $.scrollify.currentIndex()) {
				activeClass = "active";
			}
			pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span></a></li>";
		});
		pagination += "</ul>";

		$("#box1").append(pagination);/*はじめのエリアにページネーションを表示*/
		$(".pagination a").on("click", $.scrollify.move);
	}

});



function fadeAnime() {
	$('.blurTrigger').each(function () {
		var elemPos = $(this).offset().top - 50;
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight) {
			$(this).addClass('blur');
			$(this).removeClass('.blurTrigger');
			/* 要素より50px上の画面内に入ったらblurというクラス名を追記 */
		} else {
			$(this).removeClass('blur');
		}
	});
}


/* テキストが1文字づつ出現*/
/* TextAnimeにappeartextというクラス名を付ける定義 */
function EachTextAnimeControl() {
	$('.TextAnime').each(function () {
		var elemPos = $(this).offset().top - 5;
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight) {
			$(this).addClass("appeartext");

		} else {
			$(this).removeClass("appeartext");
		}
	});
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
	EachTextAnimeControl();//テキストが1文字づつ出現の関数を呼ぶ
	fadeAnime();
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {

	/* プログレスバー＋数字カウントアップ＋画面が開く*/
	//テキストのカウントアップ+バーの設定
	var bar = new ProgressBar.Line(splash_text, {
		// バーの種類はLINE,CIRCLE,SEMICIRCLEがあるみたい
		easing: 'easeInOut',
		duration: 1500,//1.5秒
		strokeWidth: 0.5,//ゲージの太さ
		color: '#fff',//ゲージのカラー
		trailWidth: 0.5,
		trailColor: '#bbb',
		text: {
			style: {
				position: 'absolute',
				left: '50%',
				top: '50%',
				padding: '0',
				margin: '-30px 0 0 0',
				transform: 'translate(-50%,-50%)',
				'font-size': '1rem',
				color: '#fff',
			},
			autoStyleContainer: false
		},
		step: function (state, bar) {
			bar.setText(Math.round(bar.value() * 100) + ' %'); /*テキストの数値*/
		}
	});

	//プログレスバーのアニメーションスタート
	bar.animate(1.0, function () {
		$("#splash_text").fadeOut(10);
		$(".loader_cover-up").addClass("coveranime");
		$(".loader_cover-down").addClass("coveranime");

		$("#splash").fadeOut('slow', function () {

			/* テキストが1文字づつ出現*/
			/* spanタグを追加する */
			var element = $(".TextAnime");
			element.each(function () {
				var text = $(this).text();
				var textbox = "";
				text.split('').forEach(function (t, i) {
					if (t !== " ") {
						if (i < 10) {
							textbox += '<span style="animation-delay:.' + i + 's;">' + t + '</span>';
						} else {
							var n = i / 10;
							textbox += '<span style="animation-delay:' + n + 's;">' + t + '</span>';
						}
					} else {
						textbox += t;
					}
				});
				$(this).html(textbox);
			});

			EachTextAnimeControl();//テキストが1文字づつ出現の関数を呼ぶ        
			fadeAnime();

		});
	});//=====ここまでプログレスバー表示

});// ここまでページが読み込まれたらすぐに動かしたい場合の記述

$('.slider_width').slick({
	autoplay: true,//自動的に動く
	infinite: true,//スライドをループさせる
	speed: 500,
	slidesToShow: 3,//スライドを画面に3枚見せる
	slidesToScroll: 1,//1回のスクロールで1枚の写真を移動して見せる
	prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
	nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
	centerMode: true,//要素を中央ぞろえ
	variableWidth: true,//幅の違う画像の高さを揃えて表示
	dots: true,//下のドットナビゲーションを表示
});


/* メニュートーグル */
$('.menu-toggle').on('click', function () {
	$('.menu-toggle').toggleClass("active")
	$('#sidebar-wrapper').toggleClass("active")
	$(".menu-toggle > .fa-bars, .menu-toggle > .fa-times").toggleClass("fa-bars fa-times")

});

$(body).on('load', function () {

});

/* スムーズスクロール */


/* workのモーダルウィンドウ */
$(function () {
	$('.gallery').click(function () {
		$("body").addClass("no_scroll"); // 背景固定させるクラス付与
		var id = $(this).data('id'); // 何番目のモーダルウィンドウか認識する
		$('#overlay, .modal-window[data-id="modal' + id + '"]').fadeIn();
	});

	$('.js-close , #overlay').click(function () {
		$("body").removeClass("no_scroll");
		$('#overlay, .modal-window').fadeOut();
	});
});
