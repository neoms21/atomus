describe('component: csv-atomus', function () {

    var scope, model, componentController, element;
    beforeEach(angular.mock.module('app'));

    function createController() {
        model = componentController('csvAtomus', {$scope: scope})
        model.$onInit();
    }

    beforeEach(inject(function ($rootScope, $componentController) {
        componentController = $componentController;
        scope = $rootScope.$new();
    }));


    it('should get initialized properly', function () {
        createController();
        expect(model).toBeDefined();

        expect(model.csv.result).toEqual([]);
    });


    it('should parse the data and convert to object when file is read', function () {
        createController();
        model.csv.result = [{"0": "first_name,last_name,company_name,address,city,county,postal,phone1,phone2,email,web"},
            {"0": "Aleshia,Tomkiewicz,Alan D Rosenburg Cpa Pc,14 Taylor St,St. Stephens Ward,Kent,CT2 7PP,01835-703597,01944-369967,atomkiewicz@hotmail.com,http://www.alandrosenburgcpapc.co.uk"},
            {"0": "Evan,Zigomalas,Cap Gemini America,5 Binney St,Abbey Ward,Buckinghamshire,HP11 2AX,01937-864715,01714-737668,evan.zigomalas@gmail.com,http://www.capgeminiamerica.co.uk"},
            {"0": "France,Andrade,\"Elliott, John W Esq\",8 Moor Place,East Southbourne and Tuckton W,Bournemouth,BH6 3BE,01347-368222,01935-821636,france.andrade@hotmail.com,http://www.elliottjohnwesq.co.uk"},
            {"0": "Ulysses,Mcwalters,\"Mcmahan, Ben L\",505 Exeter Rd,Hawerby cum Beesby,Lincolnshire,DN36 5RP,01912-771311,01302-601380,ulysses@hotmail.com,http://www.mcmahanbenl.co.uk"}
        ];
        scope.$apply();
        expect(model.headers.length).toEqual(11);
        expect(model.data.length).toEqual(4);
        expect(model.data[0].first_name).toEqual('Aleshia');
    });


    it("should show the data given row and column numbers", function () {
        createController();
        model.csv.result = [{"0": "first_name,last_name,company_name,address,city,county,postal,phone1,phone2,email,web"},
            {"0": "Aleshia,Tomkiewicz,Alan D Rosenburg Cpa Pc,14 Taylor St,St. Stephens Ward,Kent,CT2 7PP,01835-703597,01944-369967,atomkiewicz@hotmail.com,http://www.alandrosenburgcpapc.co.uk"},
            {"0": "Evan,Zigomalas,Cap Gemini America,5 Binney St,Abbey Ward,Buckinghamshire,HP11 2AX,01937-864715,01714-737668,evan.zigomalas@gmail.com,http://www.capgeminiamerica.co.uk"},
            {"0": "France,Andrade,\"Elliott, John W Esq\",8 Moor Place,East Southbourne and Tuckton W,Bournemouth,BH6 3BE,01347-368222,01935-821636,france.andrade@hotmail.com,http://www.elliottjohnwesq.co.uk"},
            {"0": "Ulysses,Mcwalters,\"Mcmahan, Ben L\",505 Exeter Rd,Hawerby cum Beesby,Lincolnshire,DN36 5RP,01912-771311,01302-601380,ulysses@hotmail.com,http://www.mcmahanbenl.co.uk"}
        ];
        scope.$apply();

        model.row = 2;
        model.col =1;
        model.getData()
        expect(model.result).toEqual('Evan');
        model.col =11;
        model.getData()
        expect(model.result).toEqual('http://www.capgeminiamerica.co.uk');
    })
});