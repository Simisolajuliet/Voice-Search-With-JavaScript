const searchForm = document.querySelector("search-form")
const searchFormInput = document.querySelector("#search-form input")

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

if (SpeechRecognition) {
	console.log("Your Browser supports speech Recognition")

	const micBtn = document.querySelector("button")
	const micIcon = micBtn.querySelector("i")

	const recognition = new SpeechRecognition()
	recognition.continuous = true

	micBtn.addEventListener("click", micBtnClick)
	function micBtnClick() {
		if (micIcon.classList.contains("fa-microphone")) {
			// Start Voice Recognition
			recognition.start() // First time you have to allow access to mic!
		} else {
			recognition.stop()
		}
	}

	recognition.addEventListener("start", startSpeechRecognition)
	function startSpeechRecognition() {
		micIcon.classList.remove("fa-microphone")
		micIcon.classList.add("fa-microphone-slash")
		searchFormInput.focus()
		console.log("Voice Recognition Activated, SPEAK")
	}

	recognition.addEventListener("end", endSpeechRecognition)
	function endSpeechRecognition() {
		micIcon.classList.remove("fa-microphone-slash")
		micIcon.classList.add("fa-microphone")
		searchFormInput.focus()
		console.log("Speech Recognition Service Disconnected")
	}

	recognition.addEventListener("result", resultOfSpeechRecognition)
	function resultOfSpeechRecognition(event) {
		const currentResultIndex = event.resultIndex
		const transcript = event.results[current][0].transcript

		if (transcript.toLowerCase().trim() === "stop recording") {
			recognition.stop()
		} else if (!searchFormInput.value) {
			searchFormInput.value = transcript
		} else {
			if (transcript.toLowerCase().trim() === "go") {
				searchForm.submit()
			} else if (transcript.toLowerCase().trim() === "reset input") {
				searchFormInput.value = ""
			} else {
				searchFormInput.value = transcript
			}
		}
	}
} else {
	console.log("Your Browser does not support speech Recognition")
}
