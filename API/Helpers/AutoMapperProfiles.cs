using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles() // settings to help us map our entities to our desired DTOs
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

            CreateMap<Photo, PhotoDto>();
            CreateMap<Post, PostDto>()
                .ForMember(dest => dest.PostedBy, opt => opt.MapFrom(src => src.PostedBy.Username))
                .ForMember(dest => dest.ProfilePicture, opt => opt.MapFrom(src => src.PostedBy.ProfilePicture));
            CreateMap<UpdateUserDto, AppUser>();
        }
    }
}