import { JsonObject, JsonProperty } from 'json2typescript';

import { Group } from './group';

/**
 * @deprecated since v9.5.0 - Use new model from `@knora/api` (github:dasch-swiss/knora-api-js-lib) instead
 */
@JsonObject('GroupsResponse')
export class GroupsResponse {

    @JsonProperty('groups', [Group])
    public groups: Group[] = undefined;

}
