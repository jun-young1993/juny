export interface S3ObjectTag {
  id: string
  name: string
  color: string
  type: 'month' | 'year' | 'day' | 'emotion' | string
}

export interface S3ObjectMetadata {
  id: string
  caption?: string
  captionKo?: string
}

export interface S3ObjectUser {
  id: string
  username: string
  email: string | null
  type: string
  fcmToken: string | null
  isActive: boolean
  isAdmin: boolean
  createdAt: string
  updatedAt: string
  registrationIp: string
}

export interface S3Object {
  id: string
  key: string
  url: string
  originalName: string
  size: number
  mimetype: string
  active: boolean
  isHidden: boolean
  presignedUrlExpiresAt: string
  destination: string
  appName: string
  createdAt: string
  deletedAt: string | null
  thumbnail: S3Object | null
  lowRes: S3Object | null
  tags: S3ObjectTag[]
  user: S3ObjectUser
  metadata?: S3ObjectMetadata
  likes: unknown[]
  replies: unknown[]
  reports: unknown[]
  fileType: 'image' | 'video' | 'audio' | 'document' | 'archive'
  extension: string
  isImage: boolean
  isVideo: boolean
  isAudio: boolean
  isDocument: boolean
  isArchive: boolean
  isThumbnail: boolean
  hasThumbnail: boolean
  hasLowRes: boolean
  thumbnailUrl: string
  lowResUrl: string
}

export interface UserGroup {
  id: string
  name: string
  description: string
  isActive: boolean
  isSystem: boolean
  number: string
  isJoinable: boolean
  createdAt: string
  updatedAt: string
}

export interface SharedMediaGroupUser extends S3ObjectUser {
  userGroups: UserGroup[]
}

export interface SharedMediaGroupResponse {
  id: string
  userId: string
  expiredAt: string
  shareCode: string
  title: string
  description: string | null
  s3Object: S3Object[]
  user: SharedMediaGroupUser
}
