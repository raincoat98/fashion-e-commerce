/**
 * 쿠키 관련 유틸리티 함수들
 */

/**
 * 쿠키 설정
 * @param name 쿠키 이름
 * @param value 쿠키 값
 * @param days 만료일 (기본값: 1일)
 */
export function setCookie(name: string, value: string, days: number = 1): void {
  if (typeof window === "undefined") return;

  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;

  document.cookie = `${name}=${value};${expires};path=/`;
}

/**
 * 쿠키 가져오기
 * @param name 쿠키 이름
 * @returns 쿠키 값 또는 null
 */
export function getCookie(name: string): string | null {
  if (typeof window === "undefined") return null;

  const nameEQ = name + "=";
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
}

/**
 * 쿠키 삭제
 * @param name 쿠키 이름
 */
export function deleteCookie(name: string): void {
  if (typeof window === "undefined") return;

  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

/**
 * 오늘 하루 동안 탑베너 숨기기
 */
export function hideTopBannerForToday(): void {
  const today = new Date().toDateString();
  setCookie("topBannerHidden", today, 1);
}

/**
 * 탑베너가 오늘 숨겨졌는지 확인
 * @returns 오늘 숨겨졌으면 true, 아니면 false
 */
export function isTopBannerHiddenToday(): boolean {
  const hiddenDate = getCookie("topBannerHidden");
  const today = new Date().toDateString();

  return hiddenDate === today;
}

/**
 * 특정 팝업을 오늘 하루 동안 숨기기
 * @param popupId 팝업 ID
 */
export function hidePopupForToday(popupId: string): void {
  const today = new Date().toDateString();
  setCookie(`popupHidden_${popupId}`, today, 1);
}

/**
 * 특정 팝업이 오늘 숨겨졌는지 확인
 * @param popupId 팝업 ID
 * @returns 오늘 숨겨졌으면 true, 아니면 false
 */
export function isPopupHiddenToday(popupId: string): boolean {
  const hiddenDate = getCookie(`popupHidden_${popupId}`);
  const today = new Date().toDateString();

  return hiddenDate === today;
}
