/* =================================
   SERVICES MAIN BUTTON
================================= */

const servicesButton =
    document.getElementById("servicesButton");

const servicesContent =
    document.getElementById("servicesContent");


servicesButton.addEventListener("click", () => {

    servicesButton.classList.toggle("active");

    servicesContent.classList.toggle("open");

});



/* =================================
   SERVICE CATEGORIES
================================= */

const serviceCategories =
    document.querySelectorAll(".service-category");


serviceCategories.forEach((category) => {


    const button =
        category.querySelector(
            ".service-category-button"
        );


    button.addEventListener("click", () => {


        /*
           إذا أردت أن يفتح قسم واحد فقط
           في نفس الوقت، نغلق الأقسام الأخرى
        */

        serviceCategories.forEach((otherCategory) => {

            if (otherCategory !== category) {

                otherCategory.classList.remove(
                    "active"
                );

            }

        });


        /*
           فتح / إغلاق القسم الحالي
        */

        category.classList.toggle("active");

    });

});



/* =================================
   SHARE PAGE
================================= */

const shareButton =
    document.getElementById("shareButton");


shareButton.addEventListener(
    "click",
    async function () {


        const pageUrl =
            window.location.href;


        /*
           تحديد الهاتف
        */

        const isMobile =
            /Android|iPhone|iPad|iPod/i.test(
                navigator.userAgent
            );


        /*
           المشاركة الأصلية في الهاتف
        */

        if (
            isMobile &&
            navigator.share
        ) {

            try {

                await navigator.share({

                    title:
                        "مكتب أُفُق متعدد الخدمات",

                    text:
                        "بطاقة مكتب أُفُق الرقمية",

                    url:
                        pageUrl

                });


                return;

            }

            catch (error) {


                if (
                    error.name ===
                    "AbortError"
                ) {

                    return;

                }

            }

        }


        /*
           الكمبيوتر:
           نسخ الرابط
        */

        copyPageLink(pageUrl);

    }
);



/* =================================
   COPY PAGE LINK
================================= */

async function copyPageLink(url) {


    try {


        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {


            await navigator.clipboard.writeText(
                url
            );


        }

        else {


            const textArea =
                document.createElement(
                    "textarea"
                );


            textArea.value =
                url;


            textArea.style.position =
                "fixed";

            textArea.style.left =
                "-9999px";

            textArea.style.top =
                "0";


            document.body.appendChild(
                textArea
            );


            textArea.focus();

            textArea.select();


            document.execCommand(
                "copy"
            );


            textArea.remove();

        }


        showCopyMessage();

    }


    catch (error) {


        showCopyMessage();

    }

}



/* =================================
   COPY MESSAGE
================================= */

function showCopyMessage() {


    /*
       إذا كانت الرسالة موجودة
       لا ننشئ واحدة جديدة
    */

    let message =
        document.getElementById(
            "copyMessage"
        );


    if (!message) {


        message =
            document.createElement(
                "div"
            );


        message.id =
            "copyMessage";


        message.innerHTML =
            '<i class="fa-solid fa-check"></i> تم نسخ رابط الصفحة';


        document.body.appendChild(
            message
        );


        /*
           تنسيق الرسالة
        */

        Object.assign(
            message.style,
            {

                position:
                    "fixed",

                bottom:
                    "40px",

                left:
                    "50%",

                transform:
                    "translateX(-50%)",

                background:
                    "#050a30",

                color:
                    "#f2f1ec",

                padding:
                    "6px 20px",

                borderRadius:
                    "12px",

                fontFamily:
                    "Cairo, sans-serif",

                fontSize:
                    "13px",

                boxShadow:
                    "0 10px 30px rgba(5,10,48,.25)",

                zIndex:
                    "9999",

                opacity:
                    "0",

                transition:
                    "opacity .3s ease"

            }

        );

    }


    /*
       إظهار الرسالة
    */

    setTimeout(() => {

        message.style.opacity =
            "1";

    }, 10);


    /*
       إخفاء الرسالة
    */

    setTimeout(() => {

        message.style.opacity =
            "0";

    }, 2200);

}




/* =================================
   SAVE CONTACT
   POPUP + LOGO + VCF
================================= */

const saveContact =
    document.getElementById("saveContact");


saveContact.addEventListener("click", () => {

    /* ==============================
       إذا كانت النافذة موجودة
       لا ننشئها مرة أخرى
    ============================== */

    let popup =
        document.getElementById("contactSavePopup");


    if (!popup) {

        popup =
            document.createElement("div");

        popup.id =
            "contactSavePopup";


        /* ==============================
           محتوى النافذة
        ============================== */

        popup.innerHTML = `

            <div class="contact-save-card">

                <button
                    class="contact-save-close"
                    id="contactSaveClose"
                    type="button">

                    <i class="fa-solid fa-xmark"></i>

                </button>


                <div class="contact-save-logo">

                    <img
                        src="logo.png"
                        alt="شعار مكتب أُفُق">

                </div>


                <h2>
                    مكتب أُفُق متعدد الخدمات
                </h2>


                <p class="contact-save-subtitle">
                    إضافة جهة الاتصال
                </p>


                <div class="contact-save-info">


                    <div class="contact-save-row">

                        <div class="contact-save-icon">
                            <i class="fa-solid fa-phone"></i>
                        </div>

                        <span>
                            +213 673 823 396
                        </span>

                    </div>


                    <div class="contact-save-row">

                        <div class="contact-save-icon">
                            <i class="fa-solid fa-envelope"></i>
                        </div>

                        <span>
                            ofuq.services26@gmail.com
                        </span>

                    </div>


                    <div class="contact-save-row">

                        <div class="contact-save-icon">
                            <i class="fa-solid fa-location-dot"></i>
                        </div>

                        <span>
                            بورقيقة – تيبازة
                        </span>

                    </div>


                </div>


                <button
                    class="contact-save-confirm"
                    id="contactSaveConfirm"
                    type="button">

                    <i class="fa-regular fa-address-card"></i>

                    <span>
                        إضافة إلى جهات الاتصال
                    </span>

                </button>


                <button
                    class="contact-save-cancel"
                    id="contactSaveCancel"
                    type="button">

                    إلغاء

                </button>

            </div>

        `;


        document.body.appendChild(popup);


        /* ==============================
           CSS الخاص بالنافذة
        ============================== */

        const style =
            document.createElement("style");


        style.textContent = `

            #contactSavePopup {

                position: fixed;

                inset: 0;

                z-index: 99999;

                display: flex;

                align-items: center;

                justify-content: center;

                padding: 20px;

                background:
                    rgba(5,10,48,.55);

                backdrop-filter:
                    blur(6px);

                -webkit-backdrop-filter:
                    blur(6px);

                opacity: 0;

                visibility: hidden;

                transition:
                    opacity .3s ease,
                    visibility .3s ease;

            }


            #contactSavePopup.show {

                opacity: 1;

                visibility: visible;

            }


            .contact-save-card {

                position: relative;

                width: 100%;

                max-width: 380px;

                padding:
                    28px 22px 20px;

                background:
                    rgba(242,241,236,.98);

                border-radius: 25px;

                border:
                    1px solid
                    rgba(5,10,48,.10);

                box-shadow:
                    0 25px 70px
                    rgba(0,0,0,.30);

                text-align: center;

                transform:
                    translateY(20px)
                    scale(.96);

                transition:
                    transform .35s ease;

            }


            #contactSavePopup.show
            .contact-save-card {

                transform:
                    translateY(0)
                    scale(1);

            }


            /* زر الإغلاق */

            .contact-save-close {

                position: absolute;

                top: 12px;

                left: 12px;

                width: 34px;

                height: 34px;

                border: none;

                border-radius: 50%;

                background:
                    rgba(5,10,48,.07);

                color:
                    #050a30;

                cursor: pointer;

                display: flex;

                align-items: center;

                justify-content: center;

                transition:
                    .25s ease;

            }


            .contact-save-close:hover {

                background:
                    #050a30;

                color:
                    #f2f1ec;

                transform:
                    rotate(90deg);

            }


            /* الشعار */

            .contact-save-logo {

                width: 82px;

                height: 82px;

                margin:
                    0 auto 14px;

                border-radius: 50%;

                display: flex;

                align-items: center;

                justify-content: center;

                position: relative;

            }


            .contact-save-logo::before {

                content: "";

                position: absolute;

                inset: 0;

                border:
                    1px solid
                    rgba(5,10,48,.15);

                border-radius: 50%;

            }


            .contact-save-logo::after {

                content: "";

                position: absolute;

                inset: 6px;

                border:
                    1px solid
                    rgba(5,10,48,.07);

                border-radius: 50%;

            }


            .contact-save-logo img {

                width: 66px;

                height: 66px;

                object-fit: contain;

                border-radius: 50%;

                position: relative;

                z-index: 2;

            }


            /* العنوان */

            .contact-save-card h2 {

                margin: 0;

                font-family:
                    "Amiri",
                    serif;

                font-size: 22px;

                line-height: 1.5;

                color:
                    #050a30;

            }


            .contact-save-subtitle {

                margin:
                    2px 0 18px;

                font-size: 12px;

                color:
                    #777b8d;

            }


            /* المعلومات */

            .contact-save-info {

                display: flex;

                flex-direction: column;

                gap: 8px;

                margin-bottom: 18px;

            }


            .contact-save-row {

                min-height: 46px;

                padding:
                    6px 9px;

                display: flex;

                align-items: center;

                gap: 10px;

                direction: rtl;

                background:
                    rgba(255,255,255,.60);

                border:
                    1px solid
                    rgba(5,10,48,.10);

                border-radius: 13px;

            }


            .contact-save-icon {

                width: 34px;

                height: 34px;

                flex-shrink: 0;

                display: flex;

                align-items: center;

                justify-content: center;

                border-radius: 10px;

                background:
                    #050a30;

                color:
                    #f2f1ec;

                font-size: 12px;

            }


            .contact-save-row span {

                flex: 1;

                min-width: 0;

                color:
                    #050a30;

                font-size: 12px;

                text-align: right;

                direction: ltr;

                word-break: break-word;

            }


            /* زر الإضافة */

            .contact-save-confirm {

                width: 100%;

                min-height: 53px;

                border: none;

                border-radius: 15px;

                background:
                    #050a30;

                color:
                    #f2f1ec;

                display: flex;

                align-items: center;

                justify-content: center;

                gap: 9px;

                font-family: inherit;

                font-size: 13px;

                font-weight: 600;

                cursor: pointer;

                transition:
                    .25s ease;

            }


            .contact-save-confirm:hover {

                transform:
                    translateY(-2px);

                box-shadow:
                    0 10px 25px
                    rgba(5,10,48,.22);

            }


            .contact-save-confirm:active {

                transform:
                    scale(.98);

            }


            /* إلغاء */

            .contact-save-cancel {

                margin-top: 9px;

                padding: 5px 15px;

                border: none;

                background: transparent;

                color:
                    #777b8d;

                font-family: inherit;

                font-size: 12px;

                cursor: pointer;

            }


            .contact-save-cancel:hover {

                color:
                    #050a30;

            }


            /* الهاتف */

            @media (max-width:480px) {

                .contact-save-card {

                    max-width: 350px;

                    padding:
                        25px 17px 19px;

                    border-radius: 22px;

                }


                .contact-save-card h2 {

                    font-size: 21px;

                }

            }

        `;


        document.head.appendChild(style);


        /* ==============================
           أزرار النافذة
        ============================== */

        const closeButton =
            document.getElementById(
                "contactSaveClose"
            );


        const cancelButton =
            document.getElementById(
                "contactSaveCancel"
            );


        const confirmButton =
            document.getElementById(
                "contactSaveConfirm"
            );


        /* إغلاق */

        function closeContactPopup() {

            popup.classList.remove("show");

        }


        closeButton.addEventListener(
            "click",
            closeContactPopup
        );


        cancelButton.addEventListener(
            "click",
            closeContactPopup
        );


        /* الضغط خارج البطاقة */

        popup.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === popup
                ) {

                    closeContactPopup();

                }

            }
        );


        /* ==============================
           إضافة جهة الاتصال
        ============================== */

        confirmButton.addEventListener(
            "click",
            async () => {


                const name =
                    "مكتب أُفُق متعدد الخدمات";


                const phone =
                    "+213673823396";


                const email =
                    "ofuq.services26@gmail.com";


                const address =
                    "بورقيقة – تيبازة";


                const pageUrl =
                    window.location.href;


                try {


                    /* تحميل الشعار */

                    const response =
                        await fetch("logo.png");


                    const logoBlob =
                        await response.blob();


                    /* تحويل الشعار إلى Base64 */

                    const reader =
                        new FileReader();


                    reader.onloadend =
                        function () {


                            const base64Image =
                                reader.result
                                    .split(",")[1];


                            /* إنشاء VCard */

                            const vcard =
`BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
ORG:${name}
TEL;TYPE=CELL:${phone}
EMAIL;TYPE=INTERNET:${email}
ADR;TYPE=WORK:;;${address};;;
URL:${pageUrl}
PHOTO;ENCODING=b;TYPE=PNG:${base64Image}
END:VCARD`;


                            /* إنشاء الملف */

                            const blob =
                                new Blob(
                                    [vcard],
                                    {
                                        type:
                                            "text/vcard;charset=utf-8"
                                    }
                                );


                            const url =
                                URL.createObjectURL(
                                    blob
                                );


                            /* تنزيل VCF */

                            const link =
                                document.createElement(
                                    "a"
                                );


                            link.href = url;

                            link.download =
                                "Afaq-Multiservices.vcf";


                            document.body.appendChild(
                                link
                            );


                            link.click();

                            link.remove();


                            /* إغلاق النافذة */

                            closeContactPopup();


                            setTimeout(
                                () => {

                                    URL.revokeObjectURL(
                                        url
                                    );

                                },
                                1000
                            );

                        };


                    reader.readAsDataURL(
                        logoBlob
                    );


                }

                catch (error) {

                    console.error(
                        "Contact error:",
                        error
                    );


                    alert(
                        "تعذر إنشاء جهة الاتصال."
                    );

                }

            }
        );

    }


    /* ==============================
       إظهار النافذة
    ============================== */

    setTimeout(() => {

        popup.classList.add("show");

    }, 10);

});
/* =================================
   SMART EMAIL BUTTON
================================= */

const emailButton =
    document.getElementById("emailButton");

emailButton.addEventListener("click", function (event) {

    event.preventDefault();

    const email =
        "ofuq.services26@gmail.com";

    const userAgent =
        navigator.userAgent ||
        navigator.vendor ||
        window.opera;


    /* ==============================
       ANDROID
    ============================== */

    if (/Android/i.test(userAgent)) {

        const gmailApp =
            `googlegmail://co?to=${email}`;

        const mailto =
            `mailto:${email}`;

        window.location.href =
            gmailApp;

        setTimeout(function () {

            window.location.href =
                mailto;

        }, 1200);

        return;
    }


    /* ==============================
       iPhone / iPad
    ============================== */

    if (
        /iPhone|iPad|iPod/i.test(userAgent)
    ) {

        window.location.href =
            `mailto:${email}`;

        return;
    }


    /* ==============================
       COMPUTER
    ============================== */

    window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
        "_blank"
    );

});
