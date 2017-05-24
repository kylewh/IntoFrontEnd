const app = {
  parameter: {
    count: 1
  },
  view: {
    content: document.getElementsByClassName("content")[0],
    modal: document.getElementsByClassName("modal")[0],
    requestBtn: document.getElementById("requset"),
    settingBtn: document.getElementById("setting"),
    submitBtn: document.getElementById("submit"),
    countInput: document.getElementById("requestCount"),
    closeModal: document.getElementById("close")
  },
  control: {
    handleRequest: function(e) {
      e.preventDefault();
      const { requestBtn, content } = this.view;
      const { count, refresh } = this.parameter;

      if (requestBtn.getAttribute("isLoading") === "true") {
        return;
      }
      // lock
      requestBtn.setAttribute("isLoading", true);
      requestBtn.classList.toggle("loading");
      requestBtn.innerText = "Loading...";

      ajax({
        url: "/fetch/",
        type: "get",
        data: { count },
        dataType: "json",
        succ: function _succCallback_({ result }) {
          let fragment = document.createDocumentFragment();
          result.forEach((val, idx) => {
            let newContent = document.createElement("li");
            newContent.innerText = val;
            fragment.appendChild(newContent);
          });
          content.appendChild(fragment);

          //解锁
          requestBtn.setAttribute("isLoading", false);
          requestBtn.classList.toggle("loading");
          requestBtn.innerText = "Load More";
        },
        fail: function(err) {
          alert(err);
        }
      });
    },
    handleSubmit: function() {
      const { countInput, modal } = this.view;
      this.parameter.count = countInput.value;
      modal.classList.toggle("hidden");
      console.log(this.parameter);
    },
    toggleSetting: function(e) {
      e.preventDefault();
      this.view.modal.classList.toggle("hidden");
    }
  },
  init: function() {
    const { requestBtn, submitBtn, settingBtn, closeModal } = this.view;
    const { handleRequest, handleSubmit, toggleSetting } = this.control;
    requestBtn.addEventListener("click", handleRequest.bind(app));
    submitBtn.addEventListener("click", handleSubmit.bind(app));
    settingBtn.addEventListener("click", toggleSetting.bind(app));
    closeModal.addEventListener("click", toggleSetting.bind(app));
  }
};

app.init();
