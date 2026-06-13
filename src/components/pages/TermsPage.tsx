'use client';

import React from 'react';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-[#0B0B0B]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
              <FileText className="w-7 h-7 text-[#D4AF37]" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Пользовательское соглашение</h1>
              <p className="text-white/40 text-sm mt-1">Последнее обновление: 13 июня 2026 г.</p>
            </div>
          </div>
          <div className="gold-divider" />
        </div>

        {/* Content */}
        <article className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">1. Предмет соглашения</h2>
            <p className="text-white/70 leading-relaxed">
              Настоящее Пользовательское соглашение (далее — Соглашение) регулирует отношения между индивидуальным предпринимателем Михеевым Алексеем Юрьевичем (далее — Исполнитель, Оператор) и физическим или юридическим лицом, использующим веб-сайт <span className="text-white">aktivplus-agency.ru</span> (далее — Пользователь, Клиент).
            </p>
            <p className="text-white/70 leading-relaxed mt-3">
              Используя Сайт, Пользователь подтверждает, что ознакомлен с условиями настоящего Соглашения и принимает их в полном объёме. В случае несогласия с условиями Соглашения Пользователь обязан прекратить использование Сайта.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">2. Сведения об Исполнителе</h2>
            <div className="bg-[#141414] border border-white/5 rounded-xl p-6 space-y-2">
              <p className="text-white/80"><span className="text-white/50">Наименование:</span> ИП Михеев Алексей Юрьевич</p>
              <p className="text-white/80"><span className="text-white/50">ОГРНИП:</span> 309619433000119</p>
              <p className="text-white/80"><span className="text-white/50">ИНН:</span> 616404582541</p>
              <p className="text-white/80"><span className="text-white/50">ОКПО:</span> 0167985996</p>
              <p className="text-white/80"><span className="text-white/50">Адрес:</span> г. Ростов-на-Дону, ул. Обороны д. 49/22</p>
              <p className="text-white/80"><span className="text-white/50">Телефон:</span> +7 (900) 120-13-15</p>
              <p className="text-white/80"><span className="text-white/50">E-mail:</span> info@aktivplus-agency.ru</p>
            </div>
            <p className="text-white/70 leading-relaxed mt-4">
              Услуги на Сайте оказываются ИП Михеевым А.Ю. в соответствии с действующим законодательством Российской Федерации. Исполнитель является субъектом предпринимательской деятельности и несёт ответственность в пределах, установленных законодательством РФ.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">3. Предоставляемые услуги</h2>
            <p className="text-white/70 leading-relaxed">
              Исполнитель оказывает следующие виды услуг в сфере недвижимости:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Подбор объектов недвижимости для покупки, продажи и аренды</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Консультирование по вопросам рынка недвижимости в Ростове-на-Дону и Ростовской области</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Сопровождение сделок купли-продажи и аренды объектов недвижимости</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Юридическая проверка объектов недвижимости (правовой статус, обременения, история)</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Оценка рыночной стоимости объектов недвижимости</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Помощь в получении ипотечного кредитования</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Инвестиционное консультирование в сфере недвижимости</span>
              </li>
            </ul>
            <p className="text-white/70 leading-relaxed mt-3">
              Конкретный перечень, объём и стоимость услуг определяются индивидуально и фиксируются в договоре, заключаемом между Исполнителем и Клиентом. Информация, размещённая на Сайте, носит ознакомительный характер и не является публичной офертой.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">4. Порядок использования Сайта</h2>
            <p className="text-white/70 leading-relaxed">
              Пользователь вправе использовать Сайт для:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Просмотра информации об объектах недвижимости</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Оформления заявок на консультацию и подбор объектов</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Общения с представителями Исполнителя через личный кабинет</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Формирования списка избранных объектов</span>
              </li>
            </ul>
            <p className="text-white/70 leading-relaxed mt-3">
              При использовании Сайта Пользователю запрещается:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Использовать Сайт в целях, противоречащих действующему законодательству РФ</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Публиковать, передавать или распространять информацию, нарушающую права третьих лиц</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Использовать автоматизированные средства для сбора данных с Сайта (парсинг, скрапинг)</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Предпринимать действия, направленные на нарушение нормальной работы Сайта</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Регистрироваться под чужим именем или с использованием чужих контактных данных</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">5. Информация об объектах недвижимости</h2>
            <p className="text-white/70 leading-relaxed">
              Исполнитель стремится обеспечить достоверность и актуальность информации об объектах недвижимости, размещённой на Сайте. Однако Исполнитель не гарантирует, что вся информация является полностью точной, исчерпывающей и актуальной на любой момент времени.
            </p>
            <p className="text-white/70 leading-relaxed mt-3">
              Характеристики объектов, указанные на Сайте (цена, площадь, планировка, инфраструктура и прочие), могут быть изменены без предварительного уведомления. Для получения актуальной информации Пользователю следует связаться с Исполнителем непосредственно.
            </p>
            <p className="text-white/70 leading-relaxed mt-3">
              Фотографии и изображения объектов носят иллюстративный характер и могут отличаться от реального состояния объекта. Исполнитель не несёт ответственности за возможные расхождения между изображениями и фактическим видом объекта.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">6. Интеллектуальная собственность</h2>
            <p className="text-white/70 leading-relaxed">
              Все материалы, размещённые на Сайте, включая, но не ограничиваясь, тексты, графические изображения, фотографии, дизайн, логотип, товарные знаки, программный код, являются объектами интеллектуальной собственности ИП Михеева А.Ю. и/или его контрагентов.
            </p>
            <p className="text-white/70 leading-relaxed mt-3">
              Использование указанных материалов без письменного согласия правообладателя запрещено. Допускается цитирование материалов Сайта в объёме, оправданном целью цитирования, при обязательном указании источника и наличии активной ссылки на Сайт.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">7. Ограничение ответственности</h2>
            <p className="text-white/70 leading-relaxed">
              Исполнитель не несёт ответственности за:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Временные перебои в работе Сайта, вызванные техническими причинами</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Убытки, возникшие в результате использования или невозможности использования Сайта</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Действия третьих лиц, в том числе сторонних сайтов, на которые размещены ссылки</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Несоответствие информации об объектах действительности, если это не является следствием умысла Исполнителя</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Потерю данных, вызванную обстоятельствами непреодолимой силы</span>
              </li>
            </ul>
            <p className="text-white/70 leading-relaxed mt-3">
              Совокупная ответственность Исполнителя перед Пользователем по любым основаниям не может превышать стоимость фактически оказанных Пользователю услуг.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">8. Разрешение споров</h2>
            <p className="text-white/70 leading-relaxed">
              Все споры и разногласия, возникающие из настоящего Соглашения или в связи с ним, Стороны будут стремиться разрешить путём переговоров. Для направления претензий Пользователь может использовать контактные данные, указанные в разделе 2 настоящего Соглашения.
            </p>
            <p className="text-white/70 leading-relaxed mt-3">
              В случае невозможности разрешения спора путём переговоров, спор подлежит разрешению в суде по месту нахождения Исполнителя в соответствии с действующим законодательством Российской Федерации.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">9. Заключительные положения</h2>
            <p className="text-white/70 leading-relaxed">
              Настоящее Соглашение вступает в силу с момента начала использования Сайта Пользователем и действует бессрочно.
            </p>
            <p className="text-white/70 leading-relaxed mt-3">
              Исполнитель вправе в одностороннем порядке вносить изменения в настоящее Соглашение. Актуальная версия Соглашения всегда доступна на данной странице. Продолжение использования Сайта после внесения изменений означает согласие Пользователя с новой редакцией Соглашения.
            </p>
            <p className="text-white/70 leading-relaxed mt-3">
              Если какое-либо положение настоящего Соглашения будет признано судом недействительным, остальные положения продолжают действовать в полном объёме.
            </p>
            <p className="text-white/70 leading-relaxed mt-3">
              К настоящему Соглашению и отношениям между Пользователем и Исполнителем, возникающим в связи с применением Соглашения, применяется законодательство Российской Федерации.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">10. Контактная информация</h2>
            <p className="text-white/70 leading-relaxed">
              По всем вопросам, связанным с настоящим Соглашением, Пользователь может обратиться к Исполнителю:
            </p>
            <div className="bg-[#141414] border border-white/5 rounded-xl p-6 mt-4 space-y-2">
              <p className="text-white/80">ИП Михеев Алексей Юрьевич</p>
              <p className="text-white/80">ОГРНИП: 309619433000119</p>
              <p className="text-white/80">ИНН: 616404582541</p>
              <p className="text-white/80">ОКПО: 0167985996</p>
              <p className="text-white/80">Адрес: г. Ростов-на-Дону, ул. Обороны д. 49/22</p>
              <p className="text-white/80">Телефон: <a href="tel:+79001201315" className="text-[#D4AF37] hover:text-[#F1D28A] transition-colors">+7 (900) 120-13-15</a></p>
              <p className="text-white/80">E-mail: <a href="mailto:info@aktivplus-agency.ru" className="text-[#D4AF37] hover:text-[#F1D28A] transition-colors">info@aktivplus-agency.ru</a></p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
