document.addEventListener("DOMContentLoaded", function () {
    const calendarTable = document.getElementById("calendar-table").getElementsByTagName('tbody')[0];
    const weekRangeLabel = document.getElementById("week-range");
    const eventModal = document.getElementById("event-modal");
    const closeModal = document.getElementById("close-modal");
    const eventTitle = document.getElementById("event-title");
    const eventDetails = document.getElementById("event-details");
    let currentDate = new Date();

    // 4週間分のイベント
    const events = {
        "2025-07-21": { title: "初心者向け練習", details: "19:00 - 21:00、場所: 羽球アリーナ" },
        "2025-07-23": { title: "中級者向け練習", details: "19:00 - 21:00、場所: 羽球アリーナ" },
        "2025-07-25": { title: "試合前練習", details: "18:00 - 20:00、場所: 羽球アリーナ" }
    };

    // 現在の週の開始日（Sunday）
    function getCurrentWeekStartDate(date) {
        const copiedDate = new Date(date); // 元の currentDate を破壊しない
        const dayOfWeek = copiedDate.getDay();
        copiedDate.setDate(copiedDate.getDate() - dayOfWeek);
        return copiedDate;
    }

    // カレンダーをレンダリングする関数
    function renderCalendar(date) {
        calendarTable.innerHTML = "";
        const startOfWeek = getCurrentWeekStartDate(date);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 27); // 4週間分

        const weekRangeText = `${startOfWeek.getFullYear()}年 ${startOfWeek.getMonth() + 1}月 ${startOfWeek.getDate()}日 〜 ${endOfWeek.getFullYear()}年 ${endOfWeek.getMonth() + 1}月 ${endOfWeek.getDate()}日`;
        weekRangeLabel.textContent = weekRangeText;

        let current = new Date(startOfWeek);
        for (let week = 0; week < 4; week++) {
            const row = calendarTable.insertRow();
            for (let day = 0; day < 7; day++) {
                const cell = row.insertCell();
                const yyyy = current.getFullYear();
                const mm = String(current.getMonth() + 1).padStart(2, '0');
                const dd = String(current.getDate()).padStart(2, '0');
                const dateKey = `${yyyy}-${mm}-${dd}`;

                cell.textContent = `${current.getDate()}日`;

                if (events[dateKey]) {
                    const eventDiv = document.createElement('div');
                    eventDiv.classList.add('event');
                    eventDiv.textContent = events[dateKey].title;
                    eventDiv.addEventListener('click', () => showEventDetails(events[dateKey]));
                    cell.appendChild(eventDiv);
                }

                current.setDate(current.getDate() + 1);
            }
        }
    }

    // イベントの詳細を表示
    function showEventDetails(event) {
        eventTitle.textContent = event.title;
        eventDetails.textContent = event.details;
        eventModal.style.display = "block";
    }

    // モーダルを閉じる
    closeModal.addEventListener('click', () => {
        eventModal.style.display = "none";
    });

    window.addEventListener('click', (e) => {
        if (e.target === eventModal) {
            eventModal.style.display = "none";
        }
    });

    // 週を切り替える
    document.getElementById("prev-week").addEventListener("click", () => {
        currentDate.setDate(currentDate.getDate() - 7);
        renderCalendar(currentDate);
    });

    document.getElementById("next-week").addEventListener("click", () => {
        currentDate.setDate(currentDate.getDate() + 7);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);
});