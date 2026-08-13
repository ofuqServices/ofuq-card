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
================================= */

const saveContact =
    document.getElementById("saveContact");


saveContact.addEventListener("click", () => {

    const oldPopup =
        document.getElementById("contactPopup");

    if (oldPopup) {
        oldPopup.remove();
    }


    const popup =
        document.createElement("div");

    popup.id =
        "contactPopup";


    popup.innerHTML = `

        <div class="contact-popup-box">

            <button
                class="contact-popup-close"
                id="closeContactPopup">
                <i class="fa-solid fa-xmark"></i>
            </button>


            <div class="contact-popup-logo">

                <img
                    src="logo.png"
                    alt="شعار مكتب أُفُق">

            </div>


            <h2>
                مكتب أُفُق متعدد الخدمات
            </h2>


            <p class="contact-popup-subtitle">
                إضافة جهة الاتصال
            </p>


            <div class="contact-popup-info">

                <div>
                    <i class="fa-solid fa-phone"></i>
                    <span>+213 673 823 396</span>
                </div>


                <div>
                    <i class="fa-solid fa-envelope"></i>
                    <span>
                        ofuq.services26@gmail.com
                    </span>
                </div>


                <div>
                    <i class="fa-solid fa-location-dot"></i>
                    <span>
                        بورقيقة – تيبازة
                    </span>
                </div>

            </div>


            <button
                class="add-contact-button"
                id="addContactButton">

                <i class="fa-regular fa-address-card"></i>

                إضافة إلى جهات الاتصال

            </button>

        </div>

    `;


    document.body.appendChild(popup);


    /* إغلاق النافذة */

    document
        .getElementById("closeContactPopup")
        .addEventListener("click", () => {

            popup.remove();

        });


    /* الضغط خارج النافذة */

    popup.addEventListener("click", (event) => {

        if (event.target === popup) {

            popup.remove();

        }

    });


    /* زر إضافة جهة الاتصال */

    document
        .getElementById("addContactButton")
        .addEventListener("click", () => {

            createVCard();

        });

});


/* =================================
   CREATE VCARD
================================= */

function createVCard() {

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


    const vcard =
`BEGIN:VCARD
VERSION:3.0
FN:${name}
ORG:${name}
TEL;TYPE=CELL:${phone}
EMAIL;TYPE=INTERNET:${email}
ADR;TYPE=WORK:;;${address};;;
URL:${pageUrl}
END:VCARD`;


    const blob =
        new Blob(
            [vcard],
            {
                type: "text/vcard;charset=utf-8"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "Afaq-Multiservices.vcf";


    document.body.appendChild(link);

    link.click();

    link.remove();


    setTimeout(() => {

        URL.revokeObjectURL(url);

    }, 1000);

}
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
