$(function(){
    /* Inicializace proměnné index, která unikátně identifikuje novou skupinu prvků */
    let index = 0;
    /* Funkce, která přidá skupinu prvků do formuláře */
    function addGroup(index = 0) {
        return `
        <div class="form-group row" id="group-${index}">
            <label class="col-sm-1">Start</label>
            <div class="col-sm-2">
                <input type="time" class="form-control" id="start-${index}">
            </div>
            <label class="col-sm-1">Stop</label>
            <div class="col-sm-2">
                <input type="time" class="form-control" id="stop-${index}">
            </div>
            <label class="col-sm-1">Den</label>
            <div class="col-sm-3">
                <input type="date" class="form-control" id="date-${index}">
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
            předek tlačítka Smazat, který je oddílem s třídou form-group */
            $(this).parents('div.form-group').remove();        
        });   
        /* Index se po přidání prvku zvýší, aby se zajistila jeho unikátnost */ 
        index++;
    });

})