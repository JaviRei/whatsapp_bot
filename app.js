const { createBot,createProvider,createFlow,addKeyword } = require('@bot-whatsapp/bot');

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');



const flujoCtx = addKeyword('guardar').addAnswer('cual es tu email? ',
    {
        capture:true, 
    },
    (ctx) => {
        console.log('mensaje entrante: ',ctx.body);
    }
);
    
const flujoImagen = addKeyword(['mostrar','mostra','muestra']).addAnswer('No se que pasa',{
    media: 'hola.jpg',
});

const flujoPrincipal = addKeyword(['Hola','ola','Holaa','hola']).
    addAnswer('Bienvenido').addAnswer(['Museo Mundial','Escrcibe *MOSTRAR* para ver la fotografia','Escribe *GUARDAR* para almacenar los datos'],/* 
    {
        media:'hola.jpg'
    }, */
    null,null,
    [flujoImagen,flujoCtx]
    );
 


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flujoPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
}

main();
