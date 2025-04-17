export type Product = {
  id: number; // شناسه محصول که باید یکتا باشد
  name: string; // نام محصول
  price: number; // قیمت محصول
  isAvailable: boolean; // وضعیت موجودی محصول (موجود/ناموجود)
  description?: string; // توضیحات محصول (اختیاری)
  category?: string; // دسته‌بندی محصول (اختیاری)
};
