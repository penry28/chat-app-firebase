import { html } from "../../../core";

const ContentHeader = () => {
  return html`
    <div class="main-content__header d-flex justify-content-between align-items-center">
      <div class="main-content__header-left">
        <h3 class="room-name mb-0">Room 1</h3>
        <p class="room-description mb-0">Description 1</p>
      </div>
      <div class="main-content__header-right">
        <div class="d-flex align-items-center justify-content-left">
          <div class="users-in-room">
            <ul class="d-flex mb-0">
              <li>
                <img width="30" height="30" style="border-radius: 50%;" src="https://lh3.googleusercontent.com/a-/AOh14Gi7SC1i-FQ17hKCI4mBuK1bmAp68s3lG6ebknMo=s96-c" alt="" />
              </li>
              <li>
                <img width="30" height="30" style="border-radius: 50%;" src="https://lh3.googleusercontent.com/a-/AOh14Gi7SC1i-FQ17hKCI4mBuK1bmAp68s3lG6ebknMo=s96-c" alt="" />
              </li>
              <li>
                <img width="30" height="30" style="border-radius: 50%;" src="https://lh3.googleusercontent.com/a-/AOh14Gi7SC1i-FQ17hKCI4mBuK1bmAp68s3lG6ebknMo=s96-c" alt="" />
              </li>
            </ul>
          </div>
          <button type="button" class="invite-user btn btn-primary btn-sm shadow-none ml-2">
            <svg width="17" height="17" style="fill: #FFF" t="1652507155312" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3498" width="200" height="200"><path d="M678.3 642.4c24.2-13 51.9-20.4 81.4-20.4h0.1c3 0 4.4-3.6 2.2-5.6-30.8-27.6-65.6-49.7-103.7-65.8-0.4-0.2-0.8-0.3-1.2-0.5C719.2 505 759.6 431.7 759.6 349c0-137-110.8-248-247.5-248S264.7 212 264.7 349c0 82.7 40.4 156 102.6 201.1-0.4 0.2-0.8 0.3-1.2 0.5-44.7 18.9-84.8 46-119.3 80.6-34.5 34.5-61.5 74.7-80.4 119.5C147.9 794.5 138 841 137 888.8c-0.1 4.5 3.5 8.2 8 8.2h59.9c4.3 0 7.9-3.5 8-7.8 2-77.2 32.9-149.5 87.6-204.3C357 628.2 432.2 597 512.2 597c56.7 0 111.1 15.7 158 45.1 2.5 1.5 5.5 1.7 8.1 0.3zM512.2 521c-45.8 0-88.9-17.9-121.4-50.4-32.4-32.5-50.3-75.7-50.3-121.6 0-45.9 17.9-89.1 50.3-121.6S466.3 177 512.2 177s88.9 17.9 121.4 50.4c32.4 32.5 50.3 75.7 50.3 121.6 0 45.9-17.9 89.1-50.3 121.6C601.1 503.1 558 521 512.2 521zM880 759h-84v-84c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v84h-84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h84v84c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-84h84c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" p-id="3499"></path></svg>
            <span>Mời</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

export default ContentHeader;
