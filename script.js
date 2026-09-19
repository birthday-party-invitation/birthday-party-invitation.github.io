/* =========================
   ОБРАТНЫЙ ОТСЧЁТ
========================= */

const targetDate = new Date("2027-02-20T16:00:00").getTime();

function updateCountdown(){

    const now = Date.now();
    const distance = targetDate - now;

    if(distance <= 0){

        document.getElementById("days").textContent = "000";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );

    document.getElementById("days").textContent =
        String(days).padStart(3, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);



/* =========================
   КОЛИЧЕСТВО ГОСТЕЙ
========================= */

let guests = 1;

const guestCount = document.getElementById("guestCount");
const guestInput = document.getElementById("guestInput");

document.getElementById("minusGuest").addEventListener("click", () => {

    if(guests > 1){
        guests--;
    }

    guestCount.textContent = guests;
    guestInput.value = guests;
});

document.getElementById("plusGuest").addEventListener("click", () => {

    if(guests < 10){
        guests++;
    }

    guestCount.textContent = guests;
    guestInput.value = guests;
});



/* =========================
   WEB3FORMS
========================= */

const form = document.getElementById("rsvpForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", async function(event){

    event.preventDefault();

    formMessage.textContent = "Отправляем...";

    const formData = new FormData(form);

    try{

        const response = await fetch(
            "https://api.web3forms.com/submit",
            {
                method:"POST",
                body:formData
            }
        );

        const result = await response.json();

        if(result.success){

            formMessage.textContent =
                "Спасибо! Ваш ответ отправлен ♡";

            form.reset();

            guests = 1;
            guestCount.textContent = "1";
            guestInput.value = "1";

        }else{

            formMessage.textContent =
                "Не удалось отправить ответ. Попробуйте ещё раз.";
        }

    }catch(error){

        formMessage.textContent =
            "Ошибка отправки. Попробуйте ещё раз.";

        console.error(error);
    }
});