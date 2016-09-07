"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const common_1 = require('@angular/common');
const router_1 = require('@angular/router');
const http_1 = require('@angular/http');
const user_service_1 = require('../services/user.service');
const roost_service_1 = require('../services/roost.service');
const ng2_pagination_1 = require('ng2-pagination');
const ng2_modal_1 = require('ng2-modal');
let SearchComponent = class SearchComponent {
    constructor(route, _roostService, _router) {
        this.route = route;
        this._roostService = _roostService;
        this._router = _router;
        this.isLoading = true;
        this.displayList = false;
        this.sub = this.route.params
            .subscribe(params => {
            this.searchQry = params['searchKey'];
            if (null == this.searchQry || this.searchQry == '') {
                this._router.navigate(['home']);
            }
            this.triggerSearch();
        });
    }
    ngOnInit() {
        this.pageSize = 50;
    }
    triggerSearch() {
        this._roostService.search(this.searchQry)
            .subscribe(feeds => {
            this.isLoading = false;
            this.total = feeds.count;
            this.roosts = feeds.results;
            console.log("feed" + JSON.stringify(feeds));
        }, error => this.errorMessage);
    }
    redirectToGMaps(latitude, longitude) {
        window.open('http://maps.google.com/maps?q=' + latitude + ',' + longitude);
    }
    extractDate(date) {
        this.diff = (new Date().getTime() - new Date(date).getTime()) / 1000;
        if (this.diff <= 60)
            return "Just Now";
        else if (this.diff < 3600)
            return Math.round(this.diff / 60) + " minutes ago";
        else if (this.diff < 7200)
            return "1 hour ago";
        else if (this.diff < 86400)
            return Math.round(this.diff / 3600) + " hours ago";
        else if (this.diff <= 172800)
            return "1 day ago";
        else if (this.diff > 172800)
            return Math.round(this.diff / 86400) + " days ago";
    }
    toggleShout(index) {
        this._roostService.shout(this.roosts[index].id)
            .subscribe(roosts => {
            this.roosts[index].isShout = true;
            this.roosts[index].shouts = this.roosts[index].shouts + 1;
            if (this.roosts[index].isListened == true) {
                this.roosts[index].isListened = false;
                this.roosts[index].listeners = this.roosts[index].listeners - 1;
            }
        });
        ;
    }
    toggleListen(index) {
        this._roostService.listen(this.roosts[index].id)
            .subscribe(roosts => {
            this.roosts[index].isListened = true;
            this.roosts[index].listeners = this.roosts[index].listeners + 1;
            if (this.roosts[index].isShout == true) {
                this.roosts[index].isShout = false;
                this.roosts[index].shouts = this.roosts[index].shouts - 1;
            }
        });
    }
    displayShoutsList(id) {
        this._roostService.listShouts(this.roosts[id].id)
            .subscribe(lists => {
            console.log(lists);
            this.displayList = true;
            this.lists = lists.results;
            this.displayListTitle = "Shouts by";
        });
    }
    displayListenersList(id) {
        this._roostService.listListeners(this.roosts[id].id)
            .subscribe(lists => {
            console.log(JSON.stringify(lists));
            this.displayList = true;
            this.lists = lists.results;
            this.displayListTitle = "Listened by";
        });
    }
};
SearchComponent = __decorate([
    core_1.Component({
        selector: 'search',
        templateUrl: 'app/shared/rooster.component.html',
        directives: [common_1.CORE_DIRECTIVES, ng2_pagination_1.PaginationControlsCmp, ng2_modal_1.MODAL_DIRECTIVES],
        providers: [user_service_1.UserService, roost_service_1.RoostService, http_1.HTTP_PROVIDERS, ng2_pagination_1.PaginationService],
        pipes: [ng2_pagination_1.PaginatePipe]
    }), 
    __metadata('design:paramtypes', [router_1.ActivatedRoute, roost_service_1.RoostService, router_1.Router])
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map