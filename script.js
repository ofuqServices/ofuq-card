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
    document.getElementById(
        "saveContact"
    );


saveContact.addEventListener(
    "click",
    () => {


        const name =
            "مكتب أُفُق متعدد الخدمات";


        const phone =
            "+213673823396";


        const email =
            "ofuq.services26@gmail.com";


        const address =
            "بورقيقة – تيبازة";


        const vcard =
`BEGIN:VCARD
VERSION:3.0
FN:${name}
ORG:${name}
TEL:${phone}
EMAIL:${email}
ADR:;;${address};;;;
URL:${window.location.href}
END:VCARD`;


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


        const link =
            document.createElement(
                "a"
            );


        link.href =
            url;


        link.download =
            "Afaq-Multiservices.vcf";


        document.body.appendChild(
            link
        );


        link.click();


        link.remove();


        setTimeout(() => {

            URL.revokeObjectURL(
                url
            );

        }, 1000);

    }
);