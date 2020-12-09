$(function(){
    /* Inicializace proměnné index, která unikátně identifikuje novou skupinu prvků */
    let index = 0;
    /* Funkce, která přidá skupinu prvků do formuláře */
    function addGroup(index = 0) {
        return `
        <div class="form-group row p-1 group-time" id="group-${index}">
            <label class="col-sm-1">Start</label>
            <div class="col-sm-2">
                <input type="time" class="form-control" required name="start" id="start-${index}">
            </div>
            <label class="col-sm-1">Stop</label>
            <div class="col-sm-2">
                <input type="time" class="form-control" required name="stop" id="stop-${index}">
            </div>
            <label class="col-sm-1">Den</label>
            <div class="col-sm-3">
                <input type="date" class="form-control" required name="date" id="date-${index}">
            </div>
            <div class="col-sm-2">
                <button type="button" class="btn btn-danger delete" id="delete-${index}">Smazat</button>
            </div>
        </div>
        `;
    }
    
    /* Akce po kliknutí na tlačítko Přidat nový čas */
    $('#append').on('click', function() { 
        /* Přidá skupinu prvků jako nový blok do formuláře */
        $('#times').append(addGroup(index));
        /* Ošetření akce kliknutí na tlačítko Smazat - smaže se vybraná skupina prvků */
        $('.delete').on('click', function() { 
            /* Příklad traverzování - vyhledá se a odstraní celý element - 
            předek tlačítka Smazat, který je oddílem s třídou group-time */
            $(this).parents('div.group-time').remove();        
        });   
        /* Index se po přidání prvku zvýší, aby se zajistila jeho unikátnost */ 
        index++;
    });

    /* Pole pro uložení dat z formuláře */
    let data = [];

    /* Validační funkce pro ověření platnosti zadaných údajů */
    function validateData(obj) {
        /* Z obou časových stringů odebere dvojtečku a porovná, zda je konečný údaj větší */
        /* Musí být zadáno také neprázdné datum */
        return (obj.start.replace(':', '') < obj.stop.replace(':', '')) && obj.date; 
    }

    /* Ošetření události kliknutí na tlačítko Odeslat formulář */
    $('#send').on('click', function() {
        /* Nastavení kontrolní proměnné valid - na začátku předpokládáme platný formulář */
        let valid = true;
        /* Vyprázdění pole data */
        data = [];
        /* Přidání třídy d-none - zneviditelnění divu s id=error */
        $('#error').addClass('d-none');
        /* Prochází všechny objekty s třídou .group-time  */
        $('div.group-time').each(function(key, obj) {
            /* Pomocný objekt pro uložení dat z jedné skupiny */
            let timeGroup = {}
            /* Prochází všechny elementy input ve skupině */
            $(obj).find('input').each(function(key, input) {
                /* Přidá do objektu timeGroup údaj s klíčem input.name a přiřadí mu hodnotu z formuláře */
                timeGroup[input.name] = input.value;
            });
            /* V případě, že byla ve skupině zjištěna neplatná data */
            if (!validateData(timeGroup)) {
                /* Změní styl skupiny pomocí třídy .error */
                $(obj).addClass('error');
                /* Nastaví příznak neplatnosti formuláře */
                valid = false;
            } else {
                /* Data ve skupině jsou platná, není třeba zdůrazňovat chybu */
                $(obj).removeClass('error');
            }
            /* Jsou-li data platná, vloží se objekt s údaji pro danou skupinu do pole data */
            if (valid) data.push(timeGroup);
        });
        if (!valid) {
           /* Když je formulář nevalidní, zviditelní se chybový alert */ 
           $('#error').removeClass('d-none');
        }
        /* JSON serializace dat z formuláře */
        console.log(JSON.stringify(data));
    });

})