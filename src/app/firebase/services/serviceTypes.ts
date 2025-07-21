// ===================================
// types/serviceTypes.ts
// ===================================

/**
 * نوع موحد لنتائج الخدمات - يضمن consistent error handling
 */
export type ServiceResult<T> = {
  success: true;
  data: T;
  error: null;
} | {
  success: false;
  data: null;
  error: {
    code: ServiceErrorCode;
    message: string;
    details?: any;
  };
}

/**
 * أكواد الأخطاء المختلفة
 */
export enum ServiceErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  FIRESTORE_ERROR = 'FIRESTORE_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

/**
 * helper function لإنشاء نتيجة ناجحة
 */
export function createSuccessResult<T>(data: T): ServiceResult<T> {
  return {
    success: true,
    data,
    error: null
  };
}

/**
 * helper function لإنشاء نتيجة فاشلة
 */
export function createErrorResult<T>(
  code: ServiceErrorCode,
  message: string,
  details?: any
): ServiceResult<T> {
  return {
    success: false,
    data: null,
    error: { code, message, details }
  };
}
