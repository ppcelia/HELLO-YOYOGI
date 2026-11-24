/* =========================
   SEASONS SLIDER
========================= */

const seasonItems = document.querySelectorAll(".seasons__item");
const seasonButtons = document.querySelectorAll(".seasons__button");

if (seasonItems.length > 0) {

  let currentSeason = 0;
  let seasonTimer;

  // 季節の切り替え
  function changeSeason(index) {

    seasonItems.forEach((item, i) => {
      item.classList.toggle("is-active", i === index);
    });

    seasonButtons.forEach((btn, i) => {
      btn.classList.toggle("is-active", i === index);
      btn.setAttribute("aria-pressed", i === index);
    });

    currentSeason = index;

  }

  // 自動切り替え
  function startSeasonTimer() {

    clearInterval(seasonTimer);

    seasonTimer = setInterval(() => {

      const next = (currentSeason + 1) % seasonItems.length;
      changeSeason(next);

    }, 4000);

  }

  // ボタンクリック
  seasonButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

      changeSeason(index);
      startSeasonTimer();

    });

  });

  startSeasonTimer();

}


/* =========================
   CONTACT FORM
========================= */

const contactForm = document.querySelector("#contact-form");

if (contactForm) {

  const contactConfirm = document.querySelector("#contact-confirm");
  const contactComplete = document.querySelector("#contact-complete");
  const contactSteps = document.querySelectorAll(".contact__step");

  const lastName = document.querySelector("#last-name");
  const firstName = document.querySelector("#first-name");
  const email = document.querySelector("#email");
  const category = document.querySelector("#category");
  const message = document.querySelector("#message");
  const privacy = document.querySelector("#privacy");


  // STEP切り替え

  function changeStep(index) {

    contactSteps.forEach((step, i) => {
      step.classList.toggle("is-active", i === index);
    });

    document.querySelector(".contact").scrollIntoView({
      behavior: "smooth"
    });

  }


  // エラーメッセージ

  function showError(id, text) {
    document.querySelector(id).textContent = text;
  }


  // 入力チェック

  contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let isValid = true;

    // エラーをリセット

    document.querySelectorAll(".contact__error").forEach(error => {
      error.textContent = "";
    });

    // 名前

    if (lastName.value.trim() === "" ||
        firstName.value.trim() === "") {

      showError("#name-error", "お名前を入力してください。");
      isValid = false;

    }

    // メールアドレス

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {

      showError("#email-error", "メールアドレスを入力してください。");
      isValid = false;

    } else if (!emailPattern.test(email.value.trim())) {

      showError("#email-error", "正しいメールアドレスを入力してください。");
      isValid = false;

    }

    // お問い合わせの種類

    if (category.value === "") {

      showError("#category-error", "お問い合わせの種類を選択してください。");
      isValid = false;

    }

    // お問い合わせ内容

    if (message.value.trim() === "") {

      showError("#message-error", "お問い合わせ内容を入力してください。");
      isValid = false;

    }

    // 個人情報の同意

    if (!privacy.checked) {

      showError("#privacy-error", "個人情報の取り扱いに同意してください。");
      isValid = false;

    }

    if (!isValid) {
      return;
    }

    // 確認画面に入力内容を表示

    document.querySelector("#confirm-name").textContent =
      lastName.value + " " + firstName.value;

    document.querySelector("#confirm-email").textContent =
      email.value;

    document.querySelector("#confirm-category").textContent =
      category.value;

    document.querySelector("#confirm-message").textContent =
      message.value;

    // STEP 02

    contactForm.hidden = true;
    contactConfirm.hidden = false;

    changeStep(1);

  });


  // 戻るボタン

  document.querySelector("#contact-back").addEventListener("click", function () {

    contactConfirm.hidden = true;
    contactForm.hidden = false;

    changeStep(0);

  });


  // 送信ボタン

  document.querySelector("#contact-send").addEventListener("click", function () {

    contactConfirm.hidden = true;
    contactComplete.hidden = false;

    contactForm.reset();

    changeStep(2);

  });

}


/* =========================
   MOBILE MENU
========================= */

const menuButton = document.querySelector(".mobile-menu__button");
const sideNav = document.querySelector(".side-nav");

if (menuButton && sideNav) {

  menuButton.addEventListener("click", function () {

    const isOpen = sideNav.classList.toggle("is-open");

    menuButton.classList.toggle("is-active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);

    menuButton.setAttribute("aria-expanded", isOpen);

  });

}


/* =========================
   GAME
========================= */

const gameEntry = document.querySelector(".game-entry");
const gameModal = document.querySelector("#game-modal");

if (gameEntry && gameModal) {

  const gameClose = document.querySelector(".game-modal__close");
  const gameStart = document.querySelector(".game-modal__start");
  const gameMessage = document.querySelector(".game-modal__message");
  const gameMarks = document.querySelectorAll(".game-modal__mark");
  const gameButtonImage = gameStart.querySelector("img");

  const gameMessages = [
    "芝生に寝転んで、\n空を見よう！",
    "コーヒーを買って、\nひと休みしよう！",
    "今日いちばん好きな\n木を探そう！",
    "お気に入りの一枚を\n撮ろう！",
    "行ったことのない道を\n歩いてみよう！",
    "ベンチに座って、\n10分だけぼーっとしよう！",
    "おやつを買って、\n外で食べよう！",
    "季節の花や葉っぱを\n探してみよう！",
    "公園を一周するつもりで\n歩いてみよう！",
    "木陰でゆっくり\n本を読もう！",
    "鳥の鳴き声に\n耳をすませてみよう！",
    "スマホをしまって、\n自然を感じよう！",
    "お気に入りのベンチを\n見つけよう！",
    "空に浮かぶ雲を\n眺めてみよう！",
    "深呼吸して、\n緑の中を歩こう！"
  ];

  let lastResult = -1;
  let currentResult = -1;
  let gameTimer;
  let isRunning = false;


  // マークの切り替え

  function changeMarks(type) {

    gameMarks.forEach(mark => {
      mark.src = "images/game-" + type + ".svg";
    });

  }


  // ボタンの切り替え

  function changeButton(type, label) {

    gameButtonImage.src = "images/game-" + type + ".svg";
    gameStart.setAttribute("aria-label", label);

  }


  // ゲームを開く

  gameEntry.addEventListener("click", function () {

    gameModal.hidden = false;
    document.body.classList.add("game-open");

    gameClose.focus();

  });


  // ゲームを閉じる

  function closeGame() {

    clearInterval(gameTimer);

    isRunning = false;
    currentResult = -1;
    lastResult = -1;

    gameModal.hidden = true;
    document.body.classList.remove("game-open");

    gameMessage.textContent = "今日、なにする？";

    changeButton("start", "スタート");
    changeMarks("question");

    gameStart.classList.remove("is-pressed");

    gameEntry.focus();

  }

  gameClose.addEventListener("click", closeGame);


  // 背景クリックで閉じる

  gameModal.addEventListener("click", function (e) {

    if (e.target === gameModal) {
      closeGame();
    }

  });


  // ESCキーで閉じる

  document.addEventListener("keydown", function (e) {

    if (e.key === "Escape" && !gameModal.hidden) {
      closeGame();
    }

  });


  // メッセージをランダムに表示

  function randomMessage() {

    let random;

    do {
      random = Math.floor(Math.random() * gameMessages.length);
    } while (
      random === currentResult ||
      random === lastResult
    );

    currentResult = random;
    gameMessage.textContent = gameMessages[random];

  }


  // ボタンのアニメーション終了

  gameStart.addEventListener("animationend", function () {
    gameStart.classList.remove("is-pressed");
  });


  // START・STOP・RETRY

  gameStart.addEventListener("click", function () {

    // ボタンを押すアニメーション

    gameStart.classList.remove("is-pressed");
    void gameStart.offsetWidth;
    gameStart.classList.add("is-pressed");

    if (!isRunning) {

      // START

      isRunning = true;

      changeButton("stop", "ストップ");
      changeMarks("question");

      randomMessage();

      gameTimer = setInterval(randomMessage, 100);

    } else {

      // STOP

      clearInterval(gameTimer);

      isRunning = false;
      lastResult = currentResult;

      changeButton("retry", "もう一度");
      changeMarks("exclamation");

    }

  });

}