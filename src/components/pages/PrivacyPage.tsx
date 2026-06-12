'use client';

import React from 'react';
import { Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#0B0B0B]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
              <Shield className="w-7 h-7 text-[#D4AF37]" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Политика конфиденциальности</h1>
              <p className="text-white/40 text-sm mt-1">Последнее обновление: 13 июня 2026 г.</p>
            </div>
          </div>
          <div className="gold-divider" />
        </div>

        {/* Content */}
        <article className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">1. Общие положения</h2>
            <p className="text-white/70 leading-relaxed">
              Настоящая Политика конфиденциальности персональных данных (далее — Политика) определяет порядок обработки и защиты персональных данных физических лиц (далее — Пользователи), которые используют веб-сайт <span className="text-white">aktivplus-agency.ru</span> (далее — Сайт), принадлежащий индивидуальному предпринимателю Михееву Алексею Юрьевичу (далее — Оператор).
            </p>
            <p className="text-white/70 leading-relaxed mt-3">
              Используя Сайт, Пользователь даёт своё согласие на обработку персональных данных в соответствии с настоящей Политикой. Если Пользователь не согласен с условиями Политики, он должен прекратить использование Сайта.
            </p>
            <p className="text-white/70 leading-relaxed mt-3">
              Оператор вправе вносить изменения в настоящую Политику. При внесении изменений в заголовке Политики указывается дата последнего обновления. Новая редакция Политики вступает в силу с момента её размещения на Сайте, если иное не предусмотрено новой редакцией Политики.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">2. Оператор персональных данных</h2>
            <div className="bg-[#141414] border border-white/5 rounded-xl p-6 space-y-2">
              <p className="text-white/80"><span className="text-white/50">Наименование:</span> ИП Михеев Алексей Юрьевич</p>
              <p className="text-white/80"><span className="text-white/50">ОГРНИП:</span> 309619433000119</p>
              <p className="text-white/80"><span className="text-white/50">ИНН:</span> 616404582541</p>
              <p className="text-white/80"><span className="text-white/50">ОКПО:</span> 0167985996</p>
              <p className="text-white/80"><span className="text-white/50">Адрес:</span> г. Ростов-на-Дону, ул. Обороны д. 49/22</p>
              <p className="text-white/80"><span className="text-white/50">Телефон:</span> +7 (900) 120-13-15</p>
              <p className="text-white/80"><span className="text-white/50">E-mail:</span> info@aktivplus-agency.ru</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">3. Сбор персональных данных</h2>
            <p className="text-white/70 leading-relaxed">
              Оператор собирает персональные данные Пользователей, которые они добровольно предоставляют при:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Регистрации на Сайте (имя, номер телефона, адрес электронной почты)</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Оформлении заявки на консультацию (имя, номер телефона, текст сообщения)</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Отправке сообщений через формы обратной связи</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Обращении по указанным контактным данным</span>
              </li>
            </ul>
            <p className="text-white/70 leading-relaxed mt-3">
              Также Оператор может получать данные, которые автоматически передаются при посещении Сайта: IP-адрес, информация из cookies, данные браузера, время доступа и страницы посещения. Эта информация собирается автоматически и используется для улучшения работы Сайта.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">4. Цели обработки персональных данных</h2>
            <p className="text-white/70 leading-relaxed">
              Персональные данные Пользователей обрабатываются в следующих целях:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">1.</span>
                <span>Идентификация Пользователя при регистрации и авторизации на Сайте</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">2.</span>
                <span>Оказание услуг по подбору, продаже и аренде объектов недвижимости</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">3.</span>
                <span>Обработка заявок и обращений Пользователей</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">4.</span>
                <span>Информирование Пользователей о новых объектах недвижимости, акциях и специальных предложениях</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">5.</span>
                <span>Улучшение качества работы Сайта и его содержимого</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">6.</span>
                <span>Ведение статистики посещений Сайта</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">5. Правовые основания обработки</h2>
            <p className="text-white/70 leading-relaxed">
              Обработка персональных данных осуществляется на основании согласия Пользователя, выраженного им при регистрации на Сайте или при заполнении форм, а также в случаях, предусмотренных действующим законодательством Российской Федерации, в том числе Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных».
            </p>
            <p className="text-white/70 leading-relaxed mt-3">
              Оператор обрабатывает персональные данные Пользователя только в случае их заполнения и/или отправки Пользователем самостоятельно через специальные формы на Сайте. Заполняя соответствующие формы и отправляя свои персональные данные Оператору, Пользователь выражает своё согласие с данной Политикой.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">6. Порядок хранения и защиты данных</h2>
            <p className="text-white/70 leading-relaxed">
              Оператор принимает организационные и технические меры для защиты персональных данных Пользователей от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий третьих лиц.
            </p>
            <p className="text-white/70 leading-relaxed mt-3">
              Персональные данные Пользователей хранятся на защищённых серверах с использованием современных средств защиты информации. Доступ к персональным данным имеют только уполномоченные сотрудники Оператора, которым такая информация необходима для выполнения своих служебных обязанностей.
            </p>
            <p className="text-white/70 leading-relaxed mt-3">
              Персональные данные Пользователей хранятся в течение срока, необходимого для достижения целей их обработки, но не более срока, установленного законодательством Российской Федерации. По истечении указанного срока персональные данные уничтожаются.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">7. Передача данных третьим лицам</h2>
            <p className="text-white/70 leading-relaxed">
              Оператор не передаёт персональные данные Пользователей третьим лицам без их согласия, за исключением случаев, предусмотренных действующим законодательством Российской Федерации:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>По запросу суда или иных правоохранительных органов в рамках установленной законом процедуры</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Для защиты прав и законных интересов Оператора в судебном или ином порядке</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>В иных случаях, прямо предусмотренных действующим законодательством РФ</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">8. Использование файлов cookie</h2>
            <p className="text-white/70 leading-relaxed">
              Сайт использует файлы cookie для обеспечения корректной работы функционала авторизации, сохранения настроек Пользователя и сбора аналитической информации. Файлы cookie представляют собой небольшие текстовые файлы, которые сохраняются на устройстве Пользователя при посещении Сайта.
            </p>
            <p className="text-white/70 leading-relaxed mt-3">
              Пользователь может настроить свой браузер для отклонения файлов cookie или для предупреждения об их отправке. Однако это может повлиять на функциональность Сайта и ограничить доступ к некоторым разделам.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">9. Права Пользователя</h2>
            <p className="text-white/70 leading-relaxed">
              Пользователь имеет право на:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Доступ к своим персональным данным, обрабатываемым Оператором</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Уточнение, блокирование или уничтожение персональных данных в случае их неполноты, устаревания, неточности, незаконности получения</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Отзыв согласия на обработку персональных данных путём направления письменного уведомления Оператору</span>
              </li>
              <li className="text-white/70 leading-relaxed flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1.5 shrink-0">•</span>
                <span>Обращение с жалобой в уполномоченный орган по защите прав субъектов персональных данных (Роскомнадзор)</span>
              </li>
            </ul>
            <p className="text-white/70 leading-relaxed mt-3">
              Для реализации своих прав Пользователь может обратиться к Оператору по контактным данным, указанным в разделе 2 настоящей Политики.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#D4AF37] mb-4">10. Контактная информация</h2>
            <p className="text-white/70 leading-relaxed">
              По всем вопросам, связанным с обработкой персональных данных, Пользователь может обратиться к Оператору:
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
