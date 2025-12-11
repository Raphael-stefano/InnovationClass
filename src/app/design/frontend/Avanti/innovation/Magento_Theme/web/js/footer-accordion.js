define([
    'jquery',
    'matchMedia'
], function ($, mediaCheck) {
    'use strict';

    console.log("footer-accordion: módulo carregado");

    // Só aplica o comportamento em mobile
    mediaCheck({
        media: '(max-width: 767px)',
        entry: function () {
            // Garante DOM pronto
            $(initAccordion);
        },
        exit: function () {
            // Ao sair do mobile, remove estados e estilos inline
            $('.mobile-hidden')
                .removeClass('mobile-visible')
                .attr('style', '');
        }
    });

    function initAccordion() {
        var $accordions = $('.pagebuilder-column');

        if (!$accordions.length) {
            console.log("footer-accordion: nenhum bloco encontrado");
            return;
        }

        $accordions.each(function () {
            var $block = $(this);
            var $title = $block.find('.accordion-oppener').first();
            var $list = $block.find('.mobile-hidden');

            if (!$list.length) {
                console.log("footer-accordion: bloco sem elementos ocultos no mobile logo após o h4");
                return;
            }

            // Estado inicial: fechado
            $list.removeClass('mobile-visible');

            // Evitar duplicar eventos
            $title
                .off('click.footerAccordion')
                .on('click.footerAccordion', function () {

                    // Se quiser só um aberto por vez, descomente:
                    // $accordions.not($block).removeClass('is-open').find('ul').slideUp();
                    $accordions.not($block).each(function () {
                        $(this).find('.mobile-hidden').removeClass('mobile-visible');
                    });

                    $list.toggleClass('mobile-visible');
                });
        });
    }
});
