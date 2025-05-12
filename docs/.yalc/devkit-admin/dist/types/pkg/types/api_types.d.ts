import { ApiListOptions, PaginationParams } from '../../app/datalist';
import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb';
export type TenantsSchemaTenantView = {
    tenantId: number;
    tenantName: string;
    tenantNameAr: string;
    tenantPhone: string;
    tenantAddress: string;
    tenantAddressAr: string;
    tenantDescription: string;
    tenantDescriptionAr: string;
    tenantEmail: string;
    tenantLogo: string;
    tenantLogoVertical: string;
    tenantLogoDark: string;
    tenantValues: string;
    tenantVision: string;
    tenantMission: string;
    tenantLogoDarkVertical: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    pages: TenantsSchemaPageView[];
};
export type TenantsSchemaPageView = {
    pageId: number;
    pageName: string;
    pageNameAr: string;
    pageDescription: string;
    pageDescriptionAr: string;
    pageBreadcrumb: string;
    tenantId: number;
    pageRoute: string;
    pageCoverImage: string;
    pageCoverVideo: string;
    pageKeyWords: string;
    pageMetaDescription: string;
    pageIcon: string;
    sections: TenantsSchemaSectionView[];
};
export type TenantsSchemaSectionView = {
    sectionId: number;
    sectionName: string;
    sectionNameAr: string;
    sectionHeader: string;
    sectionHeaderAr: string;
    sectionDescription: string;
    sectionDescriptionAr: string;
    sectionButtonLabel: string;
    sectionButtonLabelAr: string;
    sectionButtonPageId: number;
    sectionImages: string[];
    tenantId: number;
    sectionBackground: string;
    sectionIcon: string;
    partials: TenantsSchemaPartial[];
};
export type TenantsSchemaPartial = {
    partialId: number;
    partialName: string;
    partialNameAr: string;
    partialLink: string;
    address: string;
    partialButtonLink: string;
    partialButtonLabel: string;
    partialButtonLabelAr: string;
    partialButtonIcon: string;
    partialButtonPageId: number;
    partialTypeId: number;
    sectionId: number;
    partialImage: string;
    partialImages: string[];
    partialLinks: {
        [key: string]: string;
    };
    partialIcons: string[];
    partialVideo: string;
    isFeatured: boolean;
    partialBrief: string;
    partialBriefAr: string;
    partialContent: string;
    partialContentAr: string;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
    deletedAt?: Timestamp;
};
export type Icon = {
    iconName: string;
    iconContent: string;
};
export type IconFindRequest = {
    iconName: string;
};
export type IconFindResponse = {
    icon: Icon;
};
export type FileListRequest = {
    bucketId: string;
    queryPath: string;
    limit: number;
    offest: number;
};
export interface FileMetadata {
    eTag: string;
    size: bigint;
    mimetype: string;
    cacheControl: string;
    lastModified?: Timestamp;
    contentLength: bigint;
    httpStatusCode: number;
}
export type StorageBucket = {
    id: string;
    name: string;
    public: boolean;
    createdAt: string;
    updatedAt: string;
    owner: string;
    fileSizeLimit: bigint;
    allowedMimeTypes: string[];
};
export type FileObject = {
    name: string;
    bucketId: string;
    owner: string;
    id: string;
    updatedAt: string;
    createdAt: string;
    lastAccessedAt: string;
    metadata?: FileMetadata;
    buckets?: StorageBucket;
};
export type FileListResponse<T extends string = 'records'> = {
    [K in T]: FileObject[];
} & {
    options?: ApiListOptions;
};
export type FileCreateRequest = {
    path: string;
    bucketName: string;
    reader: Uint8Array;
    fileType: string;
};
export type FileCreateResponse = {
    path: string;
};
export type FileCreateBulkRequest = {
    files: FileCreateRequest[];
};
export type FileCreateBulkResponse = {
    path: string[];
};
export type BucketListRequest = {};
export type BucketListResponse = {
    buckets: StorageBucket[];
};
export type BucketCreateUpdateRequest = {
    bucketName: string;
    isPulic: boolean;
    fileSizeLimit: string;
    allowedFileTypes: string[];
    isUpdate: boolean;
};
export type BucketCreateUpdateResponse = {
    bucket: StorageBucket;
};
export type DeleteRequest<TProp extends string = 'records', TRecord extends string | number = number, TVariant extends 'single' | 'bulk'> = {
    [K in TProp]: TVariant extends 'single' ? TRecord : TRecord[];
};
export type GalleryListFilters = {
    bucketId: string;
    fileName?: string;
    path?: string;
    mimeType?: string;
    queryPath?: string;
    minSize?: number;
    maxSize?: number;
    createdAtBetween?: number[];
};
export type GalleryListRequest = {
    filters: GalleryListFilters;
    paginationParams?: PaginationParams;
};
export type GalleryListResponse = {
    records: FileObject[];
    options: ApiListOptions;
};
export type AccountsSchemaUser = {
    userId: number;
    userName: string;
    tenantId: number;
    userSecurityLevel: number;
    userTypeId: number;
    userPhone: string;
    userEmail: string;
    userPassword: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
};
export type NavigationBarItem = {
    navigationBarItemId: number;
    parentId: number;
    key: string;
    label: string;
    labelAr: string;
    icon: string;
    route: string;
    level: number;
    items: NavigationBarItem[];
};
export type AuthLoginRequest = {
    loginCode: string;
    userPassword: string;
};
export type LoginInfo = {
    accessToken: string;
    accessTokenExpiresAt: string;
};
export type AuthLoginResponse = {
    user: AccountsSchemaUser;
    loginInfo: LoginInfo;
    navigationBar: NavigationBarItem[];
};
export type AuthLoginProviderCallbackRequest = {
    accessToken: string;
};
export type AuthLoginProviderRequest = {
    redirectUrl: string;
    provider: string;
};
export type AuthLoginProviderResponse = {
    url: string;
};
export type AuthResetPasswordEmailRequest = {
    email: string;
};
export type AuthResetPasswordEmailResponse = {
    message: string;
};
export type AuthResetPasswordRequest = {
    email: string;
    newPassword: string;
    newPasswordConfirmation: string;
    resetToken: string;
    redirectUrl: string;
};
export type AuthResetPasswordResponse = {
    user: AccountsSchemaUser;
    loginInfo: LoginInfo;
    navigationBar: NavigationBarItem[];
};
