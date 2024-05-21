document.addEventListener("DOMContentLoaded", () => {
    // 정답 추출

    let answer = []; // 정답
    let numbers = []; // 1~9까지 숫자
    let tries = []; // 시도한 숫자들 담을 배열

    for (let i = 1; i <= 9; i++) {
        numbers.push(i);
    }

    for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * numbers.length);
        answer.push(numbers[index]);
        numbers.splice(index, 1);
    }
    console.log(answer);

    // 변수 선언

    const input = document.querySelector("#input"); // 값 넣는 인풋창
    const button = document.querySelector("#button"); // 제출 버튼
    const result = document.querySelector("#result"); // 결과창

    // 숫자를 제대로 입력 했는가?

    button.addEventListener("click", (e) => {
        e.preventDefault(); // 초기화 해결
        let count = 0;
        let strike = 0;
        let ball = 0;
        let inputValue = parseInt(input.value); // 인풋값 숫자로 변경
        let strInputValue = inputValue.toString().split("").map(Number);
        let duplicatedInput = new Set(strInputValue);

        for (let i = 0; i < answer.length; i++) {
            let index = strInputValue.indexOf(answer[i]);
            if (answer[i] == strInputValue[i]) {
                count++;
            }

            if (index > -1) {
                if (index == i) {
                    strike++;
                } else {
                    ball++;
                }
            }
        }

        //입력을 제대로 못했다면

        if (isNaN(inputValue) || inputValue == "") {
            alert("숫자를 입력하세요");
        } else if (strInputValue.length !== 4) {
            alert("4자리 숫자를 입력하세요");
        } else if (tries.includes(inputValue)) {
            alert("이미 시도한 값입니다.");
        } else if (duplicatedInput.size !== 4) {
            alert("숫자를 중복되지 않게 입력해주세요");
        } else if (count == 4) {
            result.textContent = " 홈런 ⚾ ";
        } else {
            result.append(inputValue + ' : ' + strike + " 스트라이크 " + ball + " 볼 ", document.createElement('br'));
            tries.push(inputValue);
            console.log(tries);
        }

        // 패배 창 띄우기

        if (tries.length >= 9) {
            result.textContent = "패배! 정답은 " + answer.join("") + " 입니다.";
        }

        input.value = ""; // 인풋창 초기화
    });
});