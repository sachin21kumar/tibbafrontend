import { useTranslations } from "@/i18n/TranslationProvider";

export const FreeDelivery = () => {
    const { locale, t } = useTranslations();
  
  return (
    <section className="bg-[#56381D] py-8 sm:py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[40px] md:text-[46px] xl:text-[46px] text-white leading-tight md:leading-[0.7]">
          {t("offers.free_delivery")}
        </p>
      </div>
    </section>
  );
};
